import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { UserQueryDto } from './dto/user-query.dto';
import { paginate } from '../lib/pagination/paginator.lib';

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

  async findAllPaginated(q: UserQueryDto) {
    const { page, pageSize } = q;

    const qb = this.userRepository.createQueryBuilder('p');

    return await paginate(qb, page, pageSize);
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({
      id,
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
    const user = await this.findOneOrThrow(id);

    return await this.userRepository.save(
      new User({ ...user, ...updateUserDto }),
    );
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneOrThrow(id);

    return await this.userRepository.remove(user);
  }

  async changePassword(userId: number, newHashedPassword: string) {
    const user = await this.findOneOrThrow(userId);

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

  async findOneOrThrow(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }
}
