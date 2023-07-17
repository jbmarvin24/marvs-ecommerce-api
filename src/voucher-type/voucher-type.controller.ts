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
    return await this.checkIfExists(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoucherTypeDto: UpdateVoucherTypeDto,
  ) {
    const voucherType = await this.checkIfExists(id);
    return this.voucherTypeService.update(voucherType, updateVoucherTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const voucherType = await this.checkIfExists(id);

    return this.voucherTypeService.remove(voucherType);
  }

  private async checkIfExists(id: number): Promise<VoucherType> {
    const voucherType = await this.voucherTypeService.findOne(id);

    if (!voucherType) throw new NotFoundException();

    return voucherType;
  }
}
