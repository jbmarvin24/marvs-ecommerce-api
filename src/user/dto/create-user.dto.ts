import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 100)
  password: string;

  @Length(1, 100)
  firstName: string;

  @Length(1, 100)
  lastName: string;

  @MaxLength(500)
  middleName?: string;

  @Length(1, 500)
  address: string;

  @Length(1, 100)
  phoneNo: string;
}
