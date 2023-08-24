import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { Product } from './entities/product.entity';
import { ProductQueryDto } from './dto/product-query.dto';
import { PaginatedResult } from '../lib/pagination/paginator.lib';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<Product>> {
    return {
      data: await this.productService.create(user.id, createProductDto),
      message: 'Successfully created.',
    };
  }

  @Get()
  async findAll(
    @Query() query: ProductQueryDto,
  ): Promise<ISuccessResponse<PaginatedResult<Product>>> {
    return {
      data: await this.productService.findAllPaginated(query),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<Product>> {
    return {
      data: await this.productService.findOneOrThrow(id),
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<Product>> {
    return {
      data: await this.productService.update(id, user.id, updateProductDto),
      message: 'Successfully updated.',
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<undefined>> {
    await this.productService.remove(id, user.id);
    return {
      message: 'Successfully deleted.',
    };
  }
}
