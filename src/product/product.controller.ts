import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { Response } from '../interceptors/transform-response.interceptor';
import { Product } from './entities/product.entity';

@Controller('shop/:shopId/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: User,
    @Param('shopId', ParseIntPipe) shopId: number,
  ): Promise<Response<Product>> {
    return {
      data: await this.productService.create(user.id, shopId, createProductDto),
      message: 'Successfully created.',
    };
  }

  @Get()
  async findAll(
    @Param('shopId', ParseIntPipe) shopId: number,
  ): Promise<Response<Product[]>> {
    return {
      data: await this.productService.findAllByShopId(shopId),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<Product>> {
    return {
      data: await this.productService.findOneOrThrow(id),
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: User,
    @Param('shopId', ParseIntPipe) shopId: number,
  ): Promise<Response<Product>> {
    return {
      data: await this.productService.update(
        id,
        user.id,
        shopId,
        updateProductDto,
      ),
      message: 'Successfully updated.',
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Param('shopId', ParseIntPipe) shopId: number,
  ): Promise<Response<undefined>> {
    await this.productService.remove(id, user.id, shopId);
    return {
      message: 'Successfully deleted.',
    };
  }
}
