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
import { VoucherTypeService } from './voucher-type.service';
import { CreateVoucherTypeDto } from './dto/create-voucher-type.dto';
import { UpdateVoucherTypeDto } from './dto/update-voucher-type.dto';
import { Admin } from '../auth/decorators/admin.decorator';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { VoucherType } from './entities/voucher-type.entity';
import { VoucherTypeQueryDto } from './dto/voucher-type-query.dto';
import { PaginatedResult } from '../lib/pagination/paginator.lib';

@Controller('voucher-type')
export class VoucherTypeController {
  constructor(private readonly voucherTypeService: VoucherTypeService) {}

  @Admin()
  @Post()
  async create(
    @Body() createVoucherTypeDto: CreateVoucherTypeDto,
  ): Promise<ISuccessResponse<VoucherType>> {
    return {
      data: await this.voucherTypeService.create(createVoucherTypeDto),
      message: 'Successfully created.',
    };
  }

  @Get()
  async findAll(
    @Query() query: VoucherTypeQueryDto,
  ): Promise<ISuccessResponse<PaginatedResult<VoucherType>>> {
    return {
      data: await this.voucherTypeService.findAllPaginated(query),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<VoucherType>> {
    return {
      data: await this.voucherTypeService.findOneOrThrow(id),
    };
  }

  @Admin()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoucherTypeDto: UpdateVoucherTypeDto,
  ): Promise<ISuccessResponse<VoucherType>> {
    return {
      data: await this.voucherTypeService.update(id, updateVoucherTypeDto),
      message: 'Successfully updated.',
    };
  }

  @Admin()
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<undefined>> {
    await this.voucherTypeService.remove(id);
    return {
      message: 'Successfully deleted.',
    };
  }
}
