import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('/auth')
export class AuthContoller {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register({
      ...registerDto,
      // TODO: Create Enum
      roleId: 2,
    });
  }
}
