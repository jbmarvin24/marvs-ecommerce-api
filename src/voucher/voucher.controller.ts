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
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Admin } from '../auth/decorators/admin.decorator';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Admin()
  @Post()
  async create(@Body() createVoucherDto: CreateVoucherDto) {
    return await this.voucherService.create(createVoucherDto);
  }

  @Get()
  async findAll() {
    return await this.voucherService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.voucherService.findOne(id);
  }

  @Admin()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    return await this.voucherService.update(id, updateVoucherDto);
  }

  @Admin()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.voucherService.remove(id);
  }
}
