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
import { Response } from '../interceptors/transform-response.interceptor';
import { Shop } from './entities/shop.entity';
import { PaginatedResult } from '../search/search.controller';
import { ShopQueryDto } from './dto/shop-query.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(
    @Body() createShopDto: CreateShopDto,
    @CurrentUser() user: User,
  ): Promise<Response<Shop>> {
    return {
      data: await this.shopService.create(user.id, createShopDto),
      message: 'Successfully created.',
    };
  }

  @Get()
  async findAll(
    @Query() query: ShopQueryDto,
  ): Promise<Response<PaginatedResult<Shop>>> {
    const { count, shops } = await this.shopService.findAllPaginated(query);

    console.log(query);

    return {
      data: {
        count,
        results: shops,
      },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<Shop>> {
    return {
      data: await this.shopService.findOneOrThrow(id),
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopDto: UpdateShopDto,
    @CurrentUser() user: User,
  ): Promise<Response<Shop>> {
    return {
      data: await this.shopService.update(user.id, id, updateShopDto),
      message: 'Successfully updated.',
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<Response<undefined>> {
    await this.shopService.remove(user.id, id);

    return {
      message: 'Successfully deleted.',
    };
  }
}
