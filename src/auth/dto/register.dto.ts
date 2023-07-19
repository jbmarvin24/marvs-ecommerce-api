import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    { minLength: 6 },
    {
      message:
        'Password must be at least 6 characters and contains lower and uppuer case letters, numbers and symbols.',
    },
  )
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
