import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Shop {
  constructor(partial?: Partial<Shop>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.shops, { nullable: false })
  user: User;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column({ length: 100 })
  name: string;

  @ApiProperty()
  @Column({ length: 1000 })
  description: string;

  @ApiProperty()
  @Column({ length: 500, nullable: true })
  address: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  photo: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  website: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  email: string;

  @ApiProperty()
  @Column({ length: 50 })
  phoneNo: string;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
