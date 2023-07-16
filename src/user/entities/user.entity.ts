import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ nullable: true, length: 100 })
  middleName?: string;

  @Column({ length: 500 })
  address: string;

  @Column({ length: 100 })
  phoneNo: string;

  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  role: Role;

  @OneToMany(() => Shop, (shop) => shop.user)
  shops: Shop[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
