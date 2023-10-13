import { ApiProperty } from '@nestjs/swagger';
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
import { OrderParticular } from './order-particular.entity';

export enum OrderStatus {
  ToPay = 'to_pay',
  Paid = 'paid',
  OrderPreparing = 'order_preparing',
  InTransit = 'in_transit',
  Completed = 'completed',
}

@Entity()
export class Order {
  constructor(partial?: Partial<Order>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ApiProperty()
  @Column({ type: 'float' })
  totalAmount: number;

  @ApiProperty()
  @Column()
  orderStatus: string;

  @Column({ nullable: true })
  paymentSessionId: string | null;

  @Column({ nullable: true })
  paymentIntentId: string | null;

  @OneToMany(() => OrderParticular, (orderParticular) => orderParticular.order)
  orderParticulars: OrderParticular[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
