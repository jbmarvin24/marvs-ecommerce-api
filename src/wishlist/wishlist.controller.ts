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
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { Response } from '../interceptors/transform-response.interceptor';
import { Wishlist } from './entities/wishlist.entity';

@Controller('user/me/wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
    @CurrentUser() user: User,
  ): Promise<Response<undefined>> {
    await this.wishlistService.create(user.id, createWishlistDto.productId);

    return {
      message: 'Successfully added to wishlist.',
    };
  }

  @Get()
  async findAll(@CurrentUser() user: User): Promise<Response<Wishlist[]>> {
    return {
      data: await this.wishlistService.findAllbyUser(user.id),
    };
  }

  @Delete(':productId')
  async remove(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() user: User,
  ): Promise<Response<undefined>> {
    await this.wishlistService.remove(user.id, productId);
    return {
      message: 'Successfully removed to wishlist.',
    };
  }
}
