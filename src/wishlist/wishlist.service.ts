import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistQueryDto } from './dto/wishlist-query.dto';
import { paginate } from '../lib/pagination/paginator.lib';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}
  async create(userId: number, productId: number) {
    return await this.wishlistRepository.save(
      new Wishlist({
        userId,
        productId,
      }),
    );
  }

  async findOne(userId: number, productId: number) {
    return await this.wishlistRepository.findOneBy({
      userId,
      productId,
    });
  }

  async findAllbyUser(userId: number, q: WishlistQueryDto) {
    const { page, pageSize } = q;

    const qb = this.wishlistRepository.createQueryBuilder('w');

    qb.where('w.userId = :userId', { userId });

    qb.innerJoinAndSelect('w.product', 'product');

    return await paginate(qb, page, pageSize);
  }

  async remove(userId: number, productId: number) {
    const wishlist = await this.findOneOrThrow(userId, productId);

    return await this.wishlistRepository.remove(wishlist);
  }

  async findOneOrThrow(userId: number, productId: number) {
    const wishlist = await this.findOne(userId, productId);

    if (!wishlist) throw new NotFoundException('Wishlist not found.');

    return wishlist;
  }
}
