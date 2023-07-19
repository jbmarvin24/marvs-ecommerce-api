import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsOptional()
  @MaxLength(500)
  middleName?: string;

  @IsNotEmpty()
  @MaxLength(500)
  shippingAddress: string;

  @IsNotEmpty()
  @MaxLength(100)
  phoneNo: string;
}
