import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { Response } from '../interceptors/transform-response.interceptor';

@Controller('/auth')
export class AuthContoller {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<Response<{ token: string }>> {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return {
      data: { token },
      message: 'Successfully logged in.',
      success: true,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<Response<null>> {
    await this.authService.register({
      ...registerDto,
    });

    return {
      success: true,
      message: 'Successfully Registered.',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser() user: User,
  ): Promise<Response<null>> {
    await this.authService.changePassword(user, changePasswordDto);

    return {
      success: true,
      message: 'Successfully changed the password.',
    };
  }
}
