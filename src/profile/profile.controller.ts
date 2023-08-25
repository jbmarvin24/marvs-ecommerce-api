import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { Profile } from './entities/profile.entity';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ExceptionResponse } from '../filters/all-exception.filter';
import { ApiSuccessResponseDec } from '../decorators/success-response.decorator';

@ApiBearerAuth()
@ApiTags('Profile')
@ApiUnauthorizedResponse({
  description: 'Authentication is required',
  type: ExceptionResponse,
})
@Controller('user/me/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: "Get the current user's profile." })
  @ApiSuccessResponseDec(Profile)
  @ApiNotFoundResponse({
    description: 'Profile not found',
    type: ExceptionResponse,
  })
  @Get()
  async findOne(@CurrentUser() user: User): Promise<ISuccessResponse<Profile>> {
    return {
      data: await this.profileService.findOneOrThrow(user.id),
    };
  }

  @ApiOperation({ summary: "Update the current user's profile." })
  @ApiSuccessResponseDec(Profile)
  @ApiNotFoundResponse({
    description: 'Profile not found',
    type: ExceptionResponse,
  })
  @Patch()
  async update(
    @CurrentUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ISuccessResponse<Profile>> {
    return {
      data: await this.profileService.update(user.id, updateProfileDto),
      message: 'Successfully updated.',
    };
  }
}
