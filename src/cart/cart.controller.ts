import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ExceptionResponse } from '../filters/all-exception.filter';
import { ApiSuccessResponseDec } from '../decorators/success-response.decorator';
import { Cart } from './entities/cart.entity';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ProductService } from '../product/product.service';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { ApiPaginatedResponseDec } from '../decorators/paginated-response.decorator';
import { CartQueryDto } from './dto/cart-query.dto';
import { PaginatedResult } from '../lib/pagination/paginator.lib';

@ApiBearerAuth()
@ApiTags('Cart')
@ApiUnauthorizedResponse({
  description: 'Authentication is required',
  type: ExceptionResponse,
})
@Controller('user/me/cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  @ApiOperation({ summary: 'Add product to cart' })
  @ApiSuccessResponseDec(Cart)
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() createCartDto: CreateCartDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<undefined>> {
    await this.productService.findOneOrThrow(createCartDto.productId);

    await this.cartService.create(
      user.id,
      createCartDto.productId,
      createCartDto.quantity,
    );

    return {
      message: 'Successfully added to cart.',
    };
  }

  @ApiOperation({ summary: "Get user's cart" })
  @ApiPaginatedResponseDec(Cart)
  @Get()
  async findAll(
    @Query() query: CartQueryDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<PaginatedResult<Cart>>> {
    return {
      data: await this.cartService.findAllByUser(user.id, query),
    };
  }

  @ApiOperation({ summary: 'Remove product to cart' })
  @ApiSuccessResponseDec()
  @ApiNotFoundResponse({
    description: "The product is not in the user's cart.",
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'productId', description: 'Product Id', example: 1 })
  @Delete(':productId')
  async remove(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<undefined>> {
    await this.cartService.remove(user.id, productId);
    return {
      message: 'Successfully removed to cart.',
    };
  }
}
