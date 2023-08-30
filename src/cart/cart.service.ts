import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { paginate } from '../lib/pagination/paginator.lib';
import { CartQueryDto } from './dto/cart-query.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(userId: number, productId: number, quantity: number) {
    return await this.cartRepository.save(
      new Cart({
        userId,
        productId,
        quantity,
      }),
    );
  }

  async findOne(userId: number, productId: number) {
    return await this.cartRepository.findOneBy({
      userId,
      productId,
    });
  }

  async findAllByUser(userId: number, q: CartQueryDto) {
    const { page, pageSize } = q;

    const qb = this.cartRepository.createQueryBuilder('c');

    qb.where('c.userId = :userId', { userId });

    return await paginate(qb, page, pageSize);
  }

  async remove(userId: number, productId: number) {
    const cart = await this.findOneOrThrow(userId, productId);

    return await this.cartRepository.remove(cart);
  }

  async findOneOrThrow(userId: number, productId: number) {
    const cart = await this.findOne(userId, productId);

    if (!cart) throw new NotFoundException('Cart not found.');

    return cart;
  }
}
