import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopQueryDto } from './dto/shop-query.dto';
import { paginate } from '../lib/pagination/paginator.lib';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async create(userId: number, createShopDto: CreateShopDto): Promise<Shop> {
    return await this.shopRepository.save(
      new Shop({ ...createShopDto, userId }),
    );
  }

  async findAllPaginated(q: ShopQueryDto) {
    const { pageSize, page, name, userId } = q;

    const qb = this.shopRepository.createQueryBuilder('s');

    if (userId) {
      qb.andWhere('s.userId = :userId', { userId });
    }

    if (name)
      qb.andWhere('LOWER(s.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });

    return await paginate(qb, page, pageSize);
  }

  async findOne(id: number): Promise<Shop> {
    return await this.shopRepository.findOneBy({
      id,
    });
  }

  async findByUser(userId: number) {
    return await this.shopRepository.findBy({
      userId,
    });
  }

  async update(
    userId: number,
    shopId: number,
    updateShopDto: UpdateShopDto,
  ): Promise<Shop> {
    await this.validateShopOwner(userId, shopId);

    const shop = await this.findOneOrThrow(shopId);

    return await this.shopRepository.save(
      new Shop({
        ...shop,
        ...updateShopDto,
      }),
    );
  }

  async remove(userId: number, shopId: number): Promise<Shop> {
    await this.validateShopOwner(userId, shopId);

    const shop = await this.findOneOrThrow(shopId);

    return await this.shopRepository.remove(shop);
  }

  /**
   * Validates the shop owner by the given user id.
   * This will throw a Forbidden Exception if invalid.
   * @param currentUserId
   * @param shopId
   */
  async validateShopOwner(currentUserId: number, shopId: number) {
    const shop = await this.findOneOrThrow(shopId);

    if (shop.userId !== currentUserId)
      throw new ForbiddenException('Invalid shop owner');
  }

  async findOneOrThrow(id: number) {
    const shop = await this.findOne(id);

    if (!shop) throw new NotFoundException('Shop not found.');

    return shop;
  }
}
