import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

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
  address: string;

  @IsNotEmpty()
  @MaxLength(100)
  phoneNo: string;
}
