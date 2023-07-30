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

@Entity()
export class Wishlist {
  constructor(partial?: Partial<Wishlist>) {
    Object.assign(this, partial);
  }

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.wishlist)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User[];

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Product, (product) => product.wishlist)
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
