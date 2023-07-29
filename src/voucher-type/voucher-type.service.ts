import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherTypeDto } from './dto/create-voucher-type.dto';
import { UpdateVoucherTypeDto } from './dto/update-voucher-type.dto';
import { Repository } from 'typeorm';
import { VoucherType } from './entities/voucher-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VoucherTypeService {
  constructor(
    @InjectRepository(VoucherType)
    private readonly voucherTypeRepository: Repository<VoucherType>,
  ) {}

  async create(
    createVoucherTypeDto: CreateVoucherTypeDto,
  ): Promise<VoucherType> {
    return await this.voucherTypeRepository.save(
      new VoucherType(createVoucherTypeDto),
    );
  }

  async findAll(): Promise<VoucherType[]> {
    return await this.voucherTypeRepository.find();
  }

  async findOne(id: number): Promise<VoucherType> {
    return await this.voucherTypeRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    updateVoucherTypeDto: UpdateVoucherTypeDto,
  ): Promise<VoucherType> {
    const voucherType = await this.findOneOrThrow(id);

    return await this.voucherTypeRepository.save(
      new VoucherType({
        ...voucherType,
        ...updateVoucherTypeDto,
      }),
    );
  }

  async remove(id: number): Promise<VoucherType> {
    const voucherType = await this.findOneOrThrow(id);

    return await this.voucherTypeRepository.remove(voucherType);
  }

  async findOneOrThrow(id: number) {
    const voucherType = await this.findOne(id);

    if (!voucherType) throw new NotFoundException('Voucher Type not found.');

    return voucherType;
  }
}
