import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private shopService: ShopService,
  ) {}
  async create(
    userId: number,
    shopId: number,
    createProductDto: CreateProductDto,
  ) {
    await this.shopService.validateShopOwner(userId, shopId);

    return await this.productRepository.save(
      new Product({ ...createProductDto, shopId }),
    );
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findAllByShopId(shopId: number) {
    return await this.productRepository.findBy({
      shopId,
    });
  }

  async findOne(id: number) {
    return await this.productRepository.findOneByOrFail({
      id,
    });
  }

  async update(
    id: number,
    userId: number,
    shopId: number,
    updateProductDto: UpdateProductDto,
  ) {
    await this.shopService.validateShopOwner(userId, shopId);

    const product = await this.productRepository.findOneByOrFail({
      id,
    });

    return await this.productRepository.save(
      new Product({
        ...product,
        ...updateProductDto,
      }),
    );
  }

  async remove(id: number, userId: number, shopId: number) {
    await this.shopService.validateShopOwner(userId, shopId);

    const product = await this.productRepository.findOneByOrFail({
      id,
    });

    return await this.productRepository.remove(product);
  }
}
