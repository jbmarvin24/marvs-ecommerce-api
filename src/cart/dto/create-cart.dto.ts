import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ description: 'Product Id', example: 1 })
  @Min(1)
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Quantity', example: 1 })
  @Min(1)
  @IsNumber()
  quantity: number;
}
