import { IsNotEmpty, IsUrl, ValidateNested } from 'class-validator';
import { CreateOrderParticularDto } from './create-order-particular.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Order items',
    required: true,
    type: [CreateOrderParticularDto],
  })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateOrderParticularDto)
  items: CreateOrderParticularDto[];

  @ApiProperty({
    description: 'The success url when the payment has been done.',
    required: true,
    example: 'https://yourapp.com/payment-confirmed',
  })
  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  successUrl: string;

  @ApiProperty({
    description: 'The cancel url when the payment has been cancel.',
    required: true,
    example: 'https://yourapp.com/payment-cancelled',
  })
  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  cancelUrl: string;
}
