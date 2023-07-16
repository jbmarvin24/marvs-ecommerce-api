import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 100)
  password: string;

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
