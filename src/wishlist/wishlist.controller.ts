import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { Wishlist } from './entities/wishlist.entity';
import { ProductService } from '../product/product.service';
import { WishlistQueryDto } from './dto/wishlist-query.dto';
import { PaginatedResult } from '../lib/pagination/paginator.lib';

@Controller('user/me/wishlist')
export class WishlistController {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly productService: ProductService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<undefined>> {
    // Validate product existence
    await this.productService.findOneOrThrow(createWishlistDto.productId);

    await this.wishlistService.create(user.id, createWishlistDto.productId);

    return {
      message: 'Successfully added to wishlist.',
    };
  }

  @Get()
  async findAll(
    @Query() query: WishlistQueryDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<PaginatedResult<Wishlist>>> {
    return {
      data: await this.wishlistService.findAllbyUser(user.id, query),
    };
  }

  @Delete(':productId')
  async remove(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<undefined>> {
    await this.wishlistService.remove(user.id, productId);
    return {
      message: 'Successfully removed to wishlist.',
    };
  }
}
