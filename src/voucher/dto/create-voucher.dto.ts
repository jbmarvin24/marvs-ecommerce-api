import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateVoucherDto {
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @Min(0)
  @IsNumber()
  amount: number;

  @Min(0)
  @IsNumber()
  minimumSpent: number;

  @IsDateString()
  validity: Date;

  @MaxLength(500)
  @IsOptional()
  description: string;
}
