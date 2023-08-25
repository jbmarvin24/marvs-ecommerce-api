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
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { Shop } from './entities/shop.entity';
import { ShopQueryDto } from './dto/shop-query.dto';
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

@ApiTags('Shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a shop' })
  @ApiCreatedResponseDec(Shop)
  @ApiBadRequestResponse({
    description: 'Invalid inputs',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @Post()
  async create(
    @Body() createShopDto: CreateShopDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<Shop>> {
    return {
      data: await this.shopService.create(user.id, createShopDto),
      message: 'Successfully created.',
    };
  }

  @ApiOperation({ summary: 'Get all shops' })
  @ApiPaginatedResponseDec(Shop)
  @Public()
  @Get()
  async findAll(
    @Query() query: ShopQueryDto,
  ): Promise<ISuccessResponse<PaginatedResult<Shop>>> {
    return {
      data: await this.shopService.findAllPaginated(query),
    };
  }

  @ApiOperation({ summary: 'Find a shop' })
  @ApiSuccessResponseDec(Shop)
  @ApiNotFoundResponse({
    description: 'Shop not found',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Shop Id', example: 1 })
  @Public()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<Shop>> {
    return {
      data: await this.shopService.findOneOrThrow(id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a shop' })
  @ApiSuccessResponseDec(Shop)
  @ApiNotFoundResponse({
    description: 'Shop not found',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Invalid Shop owner',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Shop Id', example: 1 })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopDto: UpdateShopDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<Shop>> {
    return {
      data: await this.shopService.update(user.id, id, updateShopDto),
      message: 'Successfully updated.',
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a shop' })
  @ApiSuccessResponseDec()
  @ApiNotFoundResponse({
    description: 'Shop not found',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Invalid Shop owner',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Shop Id', example: 1 })
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<undefined>> {
    await this.shopService.remove(user.id, id);

    return {
      message: 'Successfully deleted.',
    };
  }
}
