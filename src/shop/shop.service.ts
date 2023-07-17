import { Injectable } from '@nestjs/common';
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

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    return await this.shopRepository.save(new Shop(createShopDto));
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

  async update(id: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    const shop = await this.shopRepository.findOneOrFail({
      where: {
        id,
      },
    });

    return await this.shopRepository.save(
      new Shop({
        ...shop,
        ...updateShopDto,
      }),
    );
  }

  async remove(id: number): Promise<Shop> {
    const shop = await this.shopRepository.findOneOrFail({
      where: {
        id,
      },
    });
    return await this.shopRepository.remove(shop);
  }
}
