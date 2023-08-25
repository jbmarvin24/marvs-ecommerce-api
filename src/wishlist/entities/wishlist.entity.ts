import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Wishlist {
  constructor(partial?: Partial<Wishlist>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.wishlist)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User[];

  @ApiProperty()
  @PrimaryColumn()
  productId: number;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.wishlist)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
