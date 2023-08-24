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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiCreatedResponseDec } from '../decorators/created-response.decorator';
import { ExceptionResponse } from '../filters/all-exception.filter';
import { Public } from '../auth/decorators/public.decorator';
import { ApiPaginatedResponseDec } from '../decorators/paginated-response.decorator';
import { ApiSuccessResponseDec } from '../decorators/success-response.decorator';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a product' })
  @ApiCreatedResponseDec(Product)
  @ApiBadRequestResponse({
    description: 'Invalid inputs',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Invalid shop owner',
    type: ExceptionResponse,
  })
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

  @ApiOperation({ summary: 'Get all products' })
  @ApiPaginatedResponseDec(Product)
  @Public()
  @Get()
  async findAll(
    @Query() query: ProductQueryDto,
  ): Promise<ISuccessResponse<PaginatedResult<Product>>> {
    return {
      data: await this.productService.findAllPaginated(query),
    };
  }

  @ApiOperation({ summary: 'Find a product' })
  @ApiSuccessResponseDec(Product)
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Product Id', example: 1 })
  @Public()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<Product>> {
    return {
      data: await this.productService.findOneOrThrow(id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  @ApiSuccessResponseDec(Product)
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Invalid product owner',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Product Id', example: 1 })
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product' })
  @ApiSuccessResponseDec()
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Invalid product owner',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Product Id', example: 1 })
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
