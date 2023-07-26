import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User, profile: Profile): Promise<User> {
    // Create Transaction
    const createdUser = await this.userRepository.manager.transaction(
      async (transactionEntityManager) => {
        const newUser = await transactionEntityManager.save(user);
        profile.user = newUser;

        await transactionEntityManager.save(profile);

        return newUser;
      },
    );

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    // TODO: Pagination

    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: {
        id,
      },
    });

    return await this.userRepository.save(
      new User({ ...user, ...updateUserDto }),
    );
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: {
        id,
      },
    });

    return await this.userRepository.remove(user);
  }

  async changePassword(userId: number, newHashedPassword: string) {
    const user = await this.userRepository.findOneOrFail({
      where: {
        id: userId,
      },
    });

    user.password = newHashedPassword;

    return await this.userRepository.save(user);
  }

  /**
   * Validate the existence of a email.
   * @param email
   * @returns True if the email exist.
   */
  async IsEmailExist(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    return Boolean(user);
  }
}
