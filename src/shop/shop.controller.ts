import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    // TODO: Get the user from the current user
    return this.shopService.create(createShopDto);
  }

  @Get()
  findAll() {
    // TODO: Pagination
    return this.shopService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const shop = await this.checkIfExists(id);

    return shop;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    const shop = await this.checkIfExists(id);

    return this.shopService.update(shop, updateShopDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const shop = await this.checkIfExists(id);
    return await this.shopService.remove(shop);
  }

  private async checkIfExists(id: number): Promise<Shop> {
    const shop = await this.shopService.findOne(id);

    if (!shop) throw new NotFoundException();

    return shop;
  }
}
