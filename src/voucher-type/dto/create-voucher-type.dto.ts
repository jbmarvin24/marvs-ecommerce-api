import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateVoucherTypeDto {
  @ApiProperty({ description: 'Name of voucher type.', example: 'Discount' })
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Voucher description' })
  @MaxLength(500)
  @IsOptional()
  description: string;
}
