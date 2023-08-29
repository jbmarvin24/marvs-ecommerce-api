import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VoucherType } from '../../voucher-type/entities/voucher-type.entity';

@Entity()
export class Voucher {
  constructor(partial?: Partial<Voucher>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  voucherTypeId: number;

  @ManyToOne(() => VoucherType, (voucherType) => voucherType.vouchers)
  @JoinColumn()
  voucherType: VoucherType;

  @ApiProperty()
  @Column({ length: 100 })
  name: string;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @Column()
  minimumSpent: number;

  @ApiProperty()
  @Column({ type: 'timestamp without time zone' })
  validity: Date;

  @ApiProperty()
  @Column({ nullable: true, length: 500 })
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
