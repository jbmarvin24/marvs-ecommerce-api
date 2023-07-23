import { Injectable } from '@nestjs/common';
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
    return await this.profileRepository.findOneByOrFail({
      userId,
    });
  }

  async update(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOneByOrFail({
      userId,
    });

    return await this.profileRepository.save(
      new Profile({ ...profile, ...updateProfileDto }),
    );
  }
}
