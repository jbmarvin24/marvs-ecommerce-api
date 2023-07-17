import { Injectable } from '@nestjs/common';
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

  async findOne(id: number): Promise<VoucherType | null> {
    return await this.voucherTypeRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    voucherType: VoucherType,
    updateVoucherTypeDto: UpdateVoucherTypeDto,
  ): Promise<VoucherType> {
    return await this.voucherTypeRepository.save(
      new VoucherType({
        ...voucherType,
        ...updateVoucherTypeDto,
      }),
    );
  }

  async remove(voucherType: VoucherType): Promise<VoucherType> {
    return await this.voucherTypeRepository.remove(voucherType);
  }
}
