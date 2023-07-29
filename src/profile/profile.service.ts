import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findOne(userId: number): Promise<Profile> {
    return await this.profileRepository.findOneBy({
      userId,
    });
  }

  async update(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.findOneOrThrow(userId);

    return await this.profileRepository.save(
      new Profile({ ...profile, ...updateProfileDto }),
    );
  }

  async findOneOrThrow(userId: number) {
    const profile = await this.findOne(userId);

    if (!profile) throw new NotFoundException('Profile not found.');

    return profile;
  }
}
