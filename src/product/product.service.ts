import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopService } from '../shop/shop.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { paginate } from '../lib//pagination/paginator.lib';

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

  async findAllPaginated(q: ProductQueryDto) {
    const { page, pageSize, brand, name, priceMax, priceMin } = q;

    const qb = this.productRepository.createQueryBuilder('p');

    if (name)
      qb.andWhere('LOWER(p.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    if (brand)
      qb.andWhere('LOWER(p.brand) LIKE :brand', {
        brand: `%${brand.toLowerCase()}%`,
      });
    if (priceMin) qb.andWhere('p.price >= :priceMin', { priceMin });
    if (priceMax) qb.andWhere('p.price <= :priceMax', { priceMax });

    return await paginate(qb, page, pageSize);
  }

  async findAllByShopId(shopId: number) {
    return await this.productRepository.findBy({
      shopId,
    });
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({
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

    const product = await this.findOneOrThrow(id);

    return await this.productRepository.save(
      new Product({
        ...product,
        ...updateProductDto,
      }),
    );
  }

  async remove(id: number, userId: number, shopId: number) {
    await this.shopService.validateShopOwner(userId, shopId);

    const product = await this.findOneOrThrow(id);

    return await this.productRepository.remove(product);
  }

  async findOneOrThrow(id: number) {
    const product = await this.findOne(id);

    if (!product) throw new NotFoundException('Product not found.');

    return product;
  }
}
