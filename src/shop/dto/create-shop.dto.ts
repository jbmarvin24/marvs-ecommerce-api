import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @MaxLength(500)
  address: string;

  @IsOptional()
  photo: string;

  @IsOptional()
  website: string;

  @IsOptional()
  email: string;

  @IsNotEmpty()
  @MaxLength(50)
  phoneNo: string;
}
