import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { UserEmailNotExist } from '../validations/user-email-not-exist.constraint';
import { CreateProfileDto } from '../../profile/dto/create-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends CreateProfileDto {
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
}
