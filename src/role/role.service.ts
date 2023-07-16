import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.save(new Role(createRoleDto));
  }

  async findAll(): Promise<Role[]> {
    // TODO: Pagination
    return await this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role | null> {
    return await this.roleRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(role: Role, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return await this.roleRepository.save(
      new Role({
        ...role,
        ...updateRoleDto,
      }),
    );
  }

  async remove(role: Role): Promise<Role> {
    return await this.roleRepository.remove(role);
  }
}
