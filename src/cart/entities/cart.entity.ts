import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Cart {
  constructor(partial?: Partial<Cart>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ApiProperty()
  @PrimaryColumn()
  productId: number;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.cart)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
