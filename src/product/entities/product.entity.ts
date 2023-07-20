import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class Product {
  constructor(partial?: Partial<Product>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column()
  shopId: number;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column('simple-array')
  photos: string[];

  @Column({ type: 'float' })
  price: number;

  @Column()
  stock: number;

  @Column({ length: 100 })
  brand: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
