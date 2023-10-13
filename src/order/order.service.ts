import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderParticular } from './entities/order-particular.entity';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';
import { OrderQueryDto } from './dto/order-query.dto';
import { paginate } from '../lib/pagination/paginator.lib';
import { OrderItem, PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderParticular)
    private readonly orderParticularRepository: Repository<OrderParticular>,
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    // Create Order Particulars
    const orderParticulars: OrderParticular[] = [];
    for (const particular of createOrderDto.items) {
      const product = await this.productService.findOneOrThrow(
        particular.productId,
      );

      orderParticulars.push(
        new OrderParticular({
          productId: product.id,
          quantity: particular.quantity,
          unitPrice: product.price,
          status: OrderStatus.ToPay,
          product,
        }),
      );
    }

    const totalAmount = orderParticulars.reduce((acc, curObj) => {
      return acc + curObj.unitPrice * curObj.quantity;
    }, 0);

    // Create Order
    const order = new Order({
      userId,
      orderStatus: OrderStatus.ToPay,
      totalAmount,
    });

    const createdOrder = await this.orderRepository.save(order);

    for (const part of orderParticulars) {
      part.order = createdOrder;
      await this.orderParticularRepository.save(part);
    }

    // Create payment
    const session = await this.paymentService.createCheckoutPayment(
      createOrderDto.successUrl + `?id=${createdOrder.id}`,
      createOrderDto.cancelUrl,
      [
        ...orderParticulars.map<OrderItem>((p) => ({
          name: p.product.name,
          description: p.product.description,
          quantity: p.quantity,
          unitAmount: p.product.price,
        })),
      ],
    );

    return {
      createdOrder,
      paymentUrl: session.paymentUrl,
    };
  }

  async findAllByUser(userId: number, q: OrderQueryDto) {
    const { page, pageSize } = q;

    const qb = this.orderParticularRepository
      .createQueryBuilder('p')
      .innerJoin('p.order', 'o')
      .innerJoinAndSelect('p.product', 'product')
      .where('o.userId = :userId', { userId });

    return await paginate(qb, page, pageSize);
  }

  async findOne(id: number) {
    return await this.findOneOrThrow(id);
  }

  async updateParticularStatus(
    id: number,
    userId: number,
    status: OrderStatus,
  ) {
    const particular = await this.findOneOrThrowOrderParticular(id);

    // Validate if the product owner is the owner who has updating the status
    await this.productService.isRightProductOwner(particular.productId, userId);

    particular.status = status;

    await this.orderParticularRepository.save(particular);
  }

  async findOneOrThrow(id: number) {
    const order = await this.orderRepository.findOneBy({
      id,
    });

    if (!order) throw new NotFoundException('Order not found.');

    return order;
  }

  async findOneOrThrowOrderParticular(id: number) {
    const orderParticular = await this.orderParticularRepository.findOneBy({
      id,
    });

    if (!orderParticular)
      throw new NotFoundException('Order particular not found.');

    return orderParticular;
  }

  async paymentConfirmed(paymentSessionId: string) {
    const order = await this.orderRepository.findOneBy({
      paymentSessionId,
    });

    if (!order) throw new NotFoundException('Order payment session not found.');

    order.orderStatus = OrderStatus.Paid;

    await this.orderRepository.save(order);
  }
}
