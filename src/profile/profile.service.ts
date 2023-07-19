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
  async create(profile: Profile): Promise<Profile> {
    return await this.profileRepository.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }

  async findOne(id: number): Promise<Profile> {
    return await this.profileRepository.findOneByOrFail({
      id,
    });
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOneByOrFail({
      id,
    });

    return await this.profileRepository.save(
      new Profile({ ...profile, ...updateProfileDto }),
    );
  }

  async remove(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOneByOrFail({
      id,
    });

    return await this.profileRepository.remove(profile);
  }
}
