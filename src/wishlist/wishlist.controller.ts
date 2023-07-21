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

@Controller('user/me/wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
    @CurrentUser() user: User,
  ) {
    return await this.wishlistService.create(
      user.id,
      createWishlistDto.productId,
    );
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    return await this.wishlistService.findAllbyUser(user.id);
  }

  @Delete(':productId')
  remove(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() user: User,
  ) {
    return this.wishlistService.remove(user.id, productId);
  }
}
