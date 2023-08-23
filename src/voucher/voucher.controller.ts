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
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Admin } from '../auth/decorators/admin.decorator';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { Voucher } from './entities/voucher.entity';
import { VoucherQueryDto } from './dto/voucher-query.dto';
import { PaginatedResult } from '../lib/pagination/paginator.lib';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Admin()
  @Post()
  async create(
    @Body() createVoucherDto: CreateVoucherDto,
  ): Promise<ISuccessResponse<Voucher>> {
    return {
      data: await this.voucherService.create(createVoucherDto),
      message: 'Successfully created.',
    };
  }

  @Get()
  async findAll(
    @Query() query: VoucherQueryDto,
  ): Promise<ISuccessResponse<PaginatedResult<Voucher>>> {
    return {
      data: await this.voucherService.findAllPaginated(query),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<Voucher>> {
    return {
      data: await this.voucherService.findOneOrThrow(id),
    };
  }

  @Admin()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ): Promise<ISuccessResponse<Voucher>> {
    return {
      data: await this.voucherService.update(id, updateVoucherDto),
      message: 'Successfully updated.',
    };
  }

  @Admin()
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<undefined>> {
    await this.voucherService.remove(id);

    return {
      message: 'Successfully deleted.',
    };
  }
}
