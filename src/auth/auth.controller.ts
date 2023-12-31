import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginTokenDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import {
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ApiSuccessResponseDec } from '../decorators/success-response.decorator';
import { ExceptionResponse } from '../filters/all-exception.filter';

@ApiTags('Authentications')
@Controller('/auth')
export class AuthContoller {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiSuccessResponseDec(LoginTokenDto)
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password',
    type: ExceptionResponse,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<ISuccessResponse<{ token: string }>> {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return {
      data: { token },
      message: 'Successfully logged in.',
    };
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiSuccessResponseDec()
  @ApiBadRequestResponse({
    description: 'Invalid inputs.',
    type: ExceptionResponse,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ISuccessResponse<null>> {
    await this.authService.register({
      ...registerDto,
    });

    return {
      message: 'Successfully Registered.',
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Changing of user password' })
  @ApiSuccessResponseDec()
  @ApiBadRequestResponse({
    description:
      'The Old Password does not match or new password is the same with the old password',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<null>> {
    await this.authService.changePassword(user, changePasswordDto);

    return {
      message: 'Successfully changed the password.',
    };
  }
}
