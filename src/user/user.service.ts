import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // TODO: hash Password
    const user = new User(createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    // TODO: Pagination

    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.save(
      new User({ ...user, ...updateUserDto }),
    );
  }

  async remove(user: User): Promise<User> {
    return await this.userRepository.remove(user);
  }
}
