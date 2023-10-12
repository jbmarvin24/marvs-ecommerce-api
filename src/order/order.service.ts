import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderParticular } from './entities/order-particular.entity';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';
import { OrderQueryDto } from './dto/order-query.dto';
import { paginate } from '../lib/pagination/paginator.lib';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderParticular)
    private readonly orderParticularRepository: Repository<OrderParticular>,
    private readonly productService: ProductService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    userId: number,
    paymentSessionId: string,
  ) {
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
      paymentIntentId: null,
      paymentSessionId,
    });

    const createdOrder = await this.orderRepository.save(order);

    for (const part of orderParticulars) {
      part.order = createdOrder;
      await this.orderParticularRepository.save(part);
    }

    return createdOrder;
  }

  async findAllByUser(userId: number, q: OrderQueryDto) {
    const { page, pageSize } = q;

    const qb = this.orderParticularRepository
      .createQueryBuilder('p')
      .innerJoin('p.order', 'o')
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
    const category = await this.orderRepository.findOneBy({
      id,
    });

    if (!category) throw new NotFoundException('Order not found.');

    return category;
  }

  async findOneOrThrowOrderParticular(id: number) {
    const category = await this.orderParticularRepository.findOneBy({
      id,
    });

    if (!category) throw new NotFoundException('Order particular not found.');

    return category;
  }
}
