import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Shop } from '../../shop/entities/shop.entity';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class Product {
  constructor(partial?: Partial<Product>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty()
  @Column()
  shopId: number;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @ApiProperty()
  @Column({ length: 100 })
  name: string;

  @ApiProperty()
  @Column({ length: 500 })
  description: string;

  @ApiProperty()
  @Column('simple-array', { nullable: true })
  photos: string[];

  @ApiProperty()
  @Column({ type: 'float' })
  price: number;

  @ApiProperty()
  @Column()
  stock: number;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlist: Wishlist[];

  @ApiProperty()
  @Column({ length: 100 })
  brand: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
