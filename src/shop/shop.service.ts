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

  async findAll(): Promise<Shop[]> {
    // TODO: Pagination
    return await this.shopRepository.find();
  }

  async findOne(id: number): Promise<Shop> {
    return await this.shopRepository.findOneOrFail({
      where: {
        id,
      },
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

    const shop = await this.shopRepository.findOneOrFail({
      where: {
        id: shopId,
      },
    });

    return await this.shopRepository.save(
      new Shop({
        ...shop,
        ...updateShopDto,
      }),
    );
  }

  async remove(userId: number, shopId: number): Promise<Shop> {
    await this.validateShopOwner(userId, shopId);

    const shop = await this.shopRepository.findOneOrFail({
      where: {
        id: shopId,
      },
    });
    return await this.shopRepository.remove(shop);
  }

  /**
   * Validates the shop owner by the given user id.
   * This will throw a Forbidden Exception if invalid.
   * @param currentUserId
   * @param shopId
   */
  async validateShopOwner(currentUserId: number, shopId: number) {
    const shop = await this.shopRepository.findOneBy({
      id: shopId,
    });

    if (!shop) throw new NotFoundException(`shopId ${shopId} does not exists.`);

    if (shop.userId !== currentUserId)
      throw new ForbiddenException('Invalid shop owner');
  }
}
