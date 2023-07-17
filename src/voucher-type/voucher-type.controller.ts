import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { VoucherTypeService } from './voucher-type.service';
import { CreateVoucherTypeDto } from './dto/create-voucher-type.dto';
import { UpdateVoucherTypeDto } from './dto/update-voucher-type.dto';
import { VoucherType } from './entities/voucher-type.entity';

@Controller('voucher-type')
export class VoucherTypeController {
  constructor(private readonly voucherTypeService: VoucherTypeService) {}

  @Post()
  async create(@Body() createVoucherTypeDto: CreateVoucherTypeDto) {
    return await this.voucherTypeService.create(createVoucherTypeDto);
  }

  @Get()
  async findAll() {
    return await this.voucherTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.voucherTypeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoucherTypeDto: UpdateVoucherTypeDto,
  ) {
    return this.voucherTypeService.update(id, updateVoucherTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.voucherTypeService.remove(id);
  }
}
