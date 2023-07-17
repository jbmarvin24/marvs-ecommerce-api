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
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

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
    return await this.checkIfExists(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    const voucher = await this.checkIfExists(id);

    return await this.voucherService.update(voucher, updateVoucherDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const voucher = await this.checkIfExists(id);

    return this.voucherService.remove(voucher);
  }

  private async checkIfExists(id: number): Promise<Voucher> {
    const voucher = await this.voucherService.findOne(id);

    if (!voucher) throw new NotFoundException();

    return voucher;
  }
}
