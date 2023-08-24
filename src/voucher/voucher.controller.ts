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
import { Public } from '../auth/decorators/public.decorator';
import { ApiPaginatedResponseDec } from '../decorators/paginated-response.decorator';
import { ApiSuccessResponseDec } from '../decorators/success-response.decorator';

@ApiTags('Voucher')
@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a voucher' })
  @ApiCreatedResponseDec(Voucher)
  @ApiBadRequestResponse({
    description: 'Invalid inputs',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Access to resource is not allowed',
    type: ExceptionResponse,
  })
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

  @ApiOperation({ summary: 'Get all vouchers.' })
  @ApiPaginatedResponseDec(Voucher)
  @Public()
  @Get()
  async findAll(
    @Query() query: VoucherQueryDto,
  ): Promise<ISuccessResponse<PaginatedResult<Voucher>>> {
    return {
      data: await this.voucherService.findAllPaginated(query),
    };
  }

  @ApiOperation({ summary: 'Find a voucher' })
  @ApiSuccessResponseDec(Voucher)
  @ApiNotFoundResponse({
    description: 'Voucher not found',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Voucher Id', example: 1 })
  @Public()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<Voucher>> {
    return {
      data: await this.voucherService.findOneOrThrow(id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a voucher' })
  @ApiSuccessResponseDec(Voucher)
  @ApiNotFoundResponse({
    description: 'Voucher not found',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Access to resource is not allowed',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Voucher Id', example: 1 })
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a voucher' })
  @ApiSuccessResponseDec()
  @ApiNotFoundResponse({
    description: 'Voucher not found',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Access to resource is not allowed',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Voucher Id', example: 1 })
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
