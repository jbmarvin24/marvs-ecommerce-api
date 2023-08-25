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
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ExceptionResponse } from '../filters/all-exception.filter';
import { ApiPaginatedResponseDec } from '../decorators/paginated-response.decorator';
import { ApiSuccessResponseDec } from '../decorators/success-response.decorator';

@ApiBearerAuth()
@ApiTags('Wishlist')
@ApiUnauthorizedResponse({
  description: 'Authentication is required',
  type: ExceptionResponse,
})
@Controller('user/me/wishlist')
export class WishlistController {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly productService: ProductService,
  ) {}

  @ApiOperation({ summary: 'Add product to wishlist' })
  @ApiSuccessResponseDec(Wishlist)
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

  @ApiOperation({ summary: "Get user's wishlist" })
  @ApiPaginatedResponseDec(Wishlist)
  @Get()
  async findAll(
    @Query() query: WishlistQueryDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<PaginatedResult<Wishlist>>> {
    return {
      data: await this.wishlistService.findAllbyUser(user.id, query),
    };
  }

  @ApiOperation({ summary: 'Remove product to wishlist' })
  @ApiSuccessResponseDec()
  @ApiNotFoundResponse({
    description: "The product is not in the user's wishlist.",
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'productId', description: 'Product Id', example: 1 })
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
