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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiCreatedResponseDec } from '../decorators/created-response.decorator';
import { ExceptionResponse } from '../filters/all-exception.filter';
import { ApiPaginatedResponseDec } from '../decorators/paginated-response.decorator';
import { ApiSuccessResponseDec } from '../decorators/success-response.decorator';

@ApiBearerAuth()
@ApiTags('Voucher Type')
@ApiUnauthorizedResponse({
  description: 'Authentication is required',
  type: ExceptionResponse,
})
@ApiForbiddenResponse({
  description: 'Access to resource is not allowed',
  type: ExceptionResponse,
})
@Admin()
@Controller('voucher-type')
export class VoucherTypeController {
  constructor(private readonly voucherTypeService: VoucherTypeService) {}

  @ApiOperation({ summary: 'Create a voucher type' })
  @ApiCreatedResponseDec(VoucherType)
  @ApiBadRequestResponse({
    description: 'Invalid inputs',
    type: ExceptionResponse,
  })
  @Post()
  async create(
    @Body() createVoucherTypeDto: CreateVoucherTypeDto,
  ): Promise<ISuccessResponse<VoucherType>> {
    return {
      data: await this.voucherTypeService.create(createVoucherTypeDto),
      message: 'Successfully created.',
    };
  }

  @ApiOperation({ summary: 'Get all voucher types' })
  @ApiPaginatedResponseDec(VoucherType)
  @Get()
  async findAll(
    @Query() query: VoucherTypeQueryDto,
  ): Promise<ISuccessResponse<PaginatedResult<VoucherType>>> {
    return {
      data: await this.voucherTypeService.findAllPaginated(query),
    };
  }

  @ApiOperation({ summary: 'Find a voucher type' })
  @ApiSuccessResponseDec(VoucherType)
  @ApiNotFoundResponse({
    description: 'Voucher type not found',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Voucher type Id', example: 1 })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<VoucherType>> {
    return {
      data: await this.voucherTypeService.findOneOrThrow(id),
    };
  }

  @ApiOperation({ summary: 'Update a voucher type' })
  @ApiSuccessResponseDec(VoucherType)
  @ApiNotFoundResponse({
    description: 'Voucher type not found',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Voucher Type Id', example: 1 })
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

  @ApiOperation({ summary: 'Update a voucher type' })
  @ApiSuccessResponseDec()
  @ApiNotFoundResponse({
    description: 'Voucher type not found',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Voucher Type Id', example: 1 })
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
