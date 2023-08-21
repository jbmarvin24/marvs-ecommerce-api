import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old Password',
    example: 'old@password',
  })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'New Password',
    example: 'new@password',
  })
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
