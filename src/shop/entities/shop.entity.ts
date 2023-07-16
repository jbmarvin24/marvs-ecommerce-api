import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Shop {
  constructor(partial?: Partial<Shop>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.shops, { nullable: false })
  user: User;

  @Column()
  userId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 1000 })
  description: string;

  @Column({ length: 500, nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  photo: string;

  @Column({ type: 'text', nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ length: 50 })
  phoneNo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
