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
import { VoucherTypeService } from './voucher-type.service';
import { CreateVoucherTypeDto } from './dto/create-voucher-type.dto';
import { UpdateVoucherTypeDto } from './dto/update-voucher-type.dto';
import { Admin } from '../auth/decorators/admin.decorator';

@Controller('voucher-type')
export class VoucherTypeController {
  constructor(private readonly voucherTypeService: VoucherTypeService) {}

  @Admin()
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

  @Admin()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoucherTypeDto: UpdateVoucherTypeDto,
  ) {
    return this.voucherTypeService.update(id, updateVoucherTypeDto);
  }

  @Admin()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.voucherTypeService.remove(id);
  }
}
