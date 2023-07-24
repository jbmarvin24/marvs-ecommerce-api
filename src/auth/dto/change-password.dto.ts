import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsStrongPassword(
    { minLength: 6 },
    {
      message:
        'newPassword must be at least 6 characters and contains lower and uppuer case letters, numbers and symbols.',
    },
  )
  @IsNotEmpty()
  newPassword: string;
}
