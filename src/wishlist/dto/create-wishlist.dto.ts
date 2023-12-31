import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({ description: 'Product Id', example: 1 })
  @Min(1)
  @IsNumber()
  productId: number;
}
