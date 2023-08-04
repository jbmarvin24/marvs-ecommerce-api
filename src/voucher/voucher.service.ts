import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VoucherQueryDto } from './dto/voucher-query.dto';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) {}

  async create(createVoucherDto: CreateVoucherDto): Promise<Voucher> {
    return await this.voucherRepository.save(new Voucher(createVoucherDto));
  }

  async findAllPaginated(q: VoucherQueryDto) {
    const { pageSize = 10, page = 1 } = q;

    const qb = this.voucherRepository.createQueryBuilder('v');

    const vouchers = await qb
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .getMany();

    const count = await qb.getCount();

    return {
      count,
      vouchers,
    };
  }

  async findOne(id: number): Promise<Voucher> {
    return await this.voucherRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    updateVoucherDto: UpdateVoucherDto,
  ): Promise<Voucher> {
    const voucher = await this.findOneOrThrow(id);

    return await this.voucherRepository.save(
      new Voucher({
        ...voucher,
        ...updateVoucherDto,
      }),
    );
  }

  async remove(id: number): Promise<Voucher> {
    const voucher = await this.findOneOrThrow(id);

    return this.voucherRepository.remove(voucher);
  }

  async findOneOrThrow(id: number) {
    const voucher = await this.findOne(id);

    if (!voucher) throw new NotFoundException('Voucher not found.');

    return voucher;
  }
}
