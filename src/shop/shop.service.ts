import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    private readonly userService: UserService,
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

  async validateShopOwner(userId: number, shopId: number) {
    const isMatch = await this.userService.validateShopOwner(userId, shopId);

    if (!isMatch) throw new ForbiddenException('Invalid shop owner');
  }
}
