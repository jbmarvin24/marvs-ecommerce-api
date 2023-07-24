import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { UserEmailNotExist } from '../validations/user-email-not-exist.constraint';
import { CreateProfileDto } from '../../profile/dto/create-profile.dto';

export class RegisterDto extends CreateProfileDto {
  @UserEmailNotExist()
  @IsEmail()
  email: string;

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
