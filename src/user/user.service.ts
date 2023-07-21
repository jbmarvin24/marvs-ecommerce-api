import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../profile/entities/profile.entity';
import { Shop } from '../shop/entities/shop.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
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

  /** Validates the shop ownership of the current logged in user.
   * @param {number} currentUserId The current logged in user.
   * @param {number} shopId The Shop Id
   * @returns {boolean} Return true if the current user is owned the shop else false.
   */
  async validateShopOwner(currentUserId: number, shopId: number) {
    const shop = await this.shopRepository.findOneBy({
      id: shopId,
    });

    if (!shop) throw new NotFoundException('Shop not found.');

    return shop.userId === currentUserId;
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
