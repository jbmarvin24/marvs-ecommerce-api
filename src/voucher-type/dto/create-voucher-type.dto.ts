import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateVoucherTypeDto {
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @MaxLength(500)
  @IsOptional()
  description: string;
}
