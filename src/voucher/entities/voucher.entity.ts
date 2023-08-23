import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Voucher {
  constructor(partial?: Partial<Voucher>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

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
