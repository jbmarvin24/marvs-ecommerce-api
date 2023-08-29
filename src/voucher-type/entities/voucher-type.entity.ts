import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Voucher } from '../../voucher/entities/voucher.entity';

@Entity()
export class VoucherType {
  constructor(partial?: Partial<VoucherType>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Voucher, (voucher) => voucher.voucherType)
  vouchers: Voucher[];

  @ApiProperty()
  @Column({ length: 500, nullable: true })
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
