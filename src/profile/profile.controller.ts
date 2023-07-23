import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('user/me/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findOne(@CurrentUser() user: User) {
    return this.profileService.findOne(user.id);
  }

  @Patch()
  update(
    @CurrentUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(user.id, updateProfileDto);
  }
}
