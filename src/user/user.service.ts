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
    // TODO: validate role foreign key constraint
    const user = new User(createUserDto);

    return await this.userRepository.save(user);
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
}
