import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrderParticularDto {
  @ApiProperty({
    enum: OrderStatus,
    description: 'The status of the order',
  })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}
