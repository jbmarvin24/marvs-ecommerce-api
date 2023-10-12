import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class OrderParticular {
  constructor(partial?: Partial<OrderParticular>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.orderParticulars)
  order: Order;

  @ApiProperty()
  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.orderParticulars)
  product: Product;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column({ type: 'float' })
  unitPrice: number;

  @ApiProperty()
  @Column()
  status: string;
}
