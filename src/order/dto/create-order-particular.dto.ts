import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderParticularDto {
  @ApiProperty({ description: 'Product Id', example: '1' })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ description: 'Quantity', example: '5' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
