import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiCreatedResponseDec } from '../decorators/created-response.decorator';
import { Order } from './entities/order.entity';
import { ExceptionResponse } from '../filters/all-exception.filter';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { ApiSuccessResponseDec } from '../decorators/success-response.decorator';
import { UpdateOrderParticularDto } from './dto/update-order-particular.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a order' })
  @ApiCreatedResponseDec(Order)
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
  ): Promise<ISuccessResponse<Order>> {
    return {
      data: await this.orderService.create(createOrderDto, user.id, 'soon'),
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
    description: 'The current user is not the right owner of the order time.',
    type: ExceptionResponse,
  })
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
}
