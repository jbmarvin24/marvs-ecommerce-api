import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateOrderParticularDto } from './create-order-particular.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Order items',
    required: true,
    type: CreateOrderParticularDto,
  })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateOrderParticularDto)
  items: CreateOrderParticularDto[];
}
