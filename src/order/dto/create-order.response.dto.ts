import { Order } from '../entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderResponseDto {
  constructor(partial?: Partial<CreateOrderResponseDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    type: Order,
  })
  order: Order;

  @ApiProperty({
    description: 'The payment url.',
    required: true,
    example: 'https://stripe.com/payment-url',
  })
  paymentUrl: string;
}
