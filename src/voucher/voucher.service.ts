import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) {}

  async create(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    return await this.voucherRepository.save(new Voucher(createVoucherDto));
  }

  async findAll(): Promise<Voucher[]> {
    return await this.voucherRepository.find();
  }

  async findOne(id: number): Promise<Voucher | null> {
    return await this.voucherRepository.findOne({ where: { id } });
  }

  async update(
    voucher: Voucher,
    updateVoucherDto: UpdateVoucherDto,
  ): Promise<Voucher> {
    return await this.voucherRepository.save(
      new Voucher({
        ...voucher,
        ...updateVoucherDto,
      }),
    );
  }

  async remove(voucher: Voucher): Promise<Voucher> {
    return this.voucherRepository.remove(voucher);
  }
}
