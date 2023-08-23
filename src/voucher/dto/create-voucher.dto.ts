import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty({ maxLength: 100 })
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ minimum: 0 })
  @Min(0)
  @IsNumber()
  amount: number;

  @ApiProperty({ minimum: 0 })
  @Min(0)
  @IsNumber()
  minimumSpent: number;

  @ApiProperty()
  @IsDateString()
  validity: Date;

  @ApiProperty({ maxLength: 500 })
  @MaxLength(500)
  @IsOptional()
  description: string;
}
