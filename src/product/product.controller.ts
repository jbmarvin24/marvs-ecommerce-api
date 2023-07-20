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

@Controller('shop/:shopId/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: User,
    @Param('shopId', ParseIntPipe) shopId: number,
  ) {
    return this.productService.create(user.id, shopId, createProductDto);
  }

  @Get()
  findAll(@Param('shopId', ParseIntPipe) shopId: number) {
    return this.productService.findAllByShopId(shopId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: User,
    @Param('shopId', ParseIntPipe) shopId: number,
  ) {
    return this.productService.update(id, user.id, shopId, updateProductDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Param('shopId', ParseIntPipe) shopId: number,
  ) {
    return this.productService.remove(id, user.id, shopId);
  }
}
