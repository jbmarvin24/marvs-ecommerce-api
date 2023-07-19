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
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto, @CurrentUser() user: User) {
    return this.shopService.create(user.id, createShopDto);
  }

  @Get()
  findAll() {
    // TODO: Pagination
    return this.shopService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.shopService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    return this.shopService.update(id, updateShopDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.shopService.remove(id);
  }
}
