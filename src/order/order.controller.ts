import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Get,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiCreatedResponseDec } from '../decorators/created-response.decorator';
import { ExceptionResponse } from '../filters/all-exception.filter';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { ApiSuccessResponseDec } from '../decorators/success-response.decorator';
import { UpdateOrderParticularDto } from './dto/update-order-particular.dto';
import { CreateOrderResponseDto } from './dto/create-order.response.dto';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a order' })
  @ApiCreatedResponseDec(CreateOrderResponseDto)
  @ApiBadRequestResponse({
    description: 'Invalid inputs',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<CreateOrderResponseDto>> {
    const result = await this.orderService.create(createOrderDto, user.id);

    return {
      data: new CreateOrderResponseDto({
        order: result.createdOrder,
        paymentUrl: result.paymentUrl,
      }),
      message: 'Successfully Created',
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update the specific order item status.' })
  @ApiSuccessResponseDec()
  @ApiBadRequestResponse({
    description: 'Invalid inputs',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'The current user is not the right owner of the order item.',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Order Id', example: 1 })
  @Put('change-status/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderParticularDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<any>> {
    await this.orderService.updateParticularStatus(
      id,
      user.id,
      updateOrderDto.status,
    );
    return {
      message: 'Successfully updated.',
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Confirm payment transaction' })
  @ApiSuccessResponseDec()
  @ApiBadRequestResponse({
    description: 'Invalid inputs',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'You dont have access to different orders.',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Order Id', example: 1 })
  @Get('confirm-payment/:id')
  async confirmOrderPayment(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<any>> {
    const isPaid = await this.orderService.confirmOrderPayment(id, user.id);

    return {
      success: isPaid,
      message: isPaid
        ? 'Payment Successfully Confirmed!'
        : 'Payment is not confirmed.',
    };
  }
}
