import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { UserEmailNotExist } from '../validations/user-email-not-exist.constraint';
import { ApiProperty } from '@nestjs/swagger';
import { IsMatched } from '../../validations/is-matched.constraint';

export class RegisterDto {
  @ApiProperty({ example: 'john.doe@gmail.com' })
  @UserEmailNotExist()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsStrongPassword(
    { minLength: 6 },
    {
      message:
        'password must be at least 6 characters and contains lower and uppuer case letters, numbers and symbols.',
    },
  )
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '123456' })
  @IsMatched('password')
  @IsNotEmpty()
  confirmPassword: string;
}
