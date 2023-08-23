import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { Profile } from './entities/profile.entity';

@Controller('user/me/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async findOne(@CurrentUser() user: User): Promise<ISuccessResponse<Profile>> {
    return {
      data: await this.profileService.findOneOrThrow(user.id),
    };
  }

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
