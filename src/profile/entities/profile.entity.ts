import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from '../dto/address.dto';

@Entity()
export class Profile {
  constructor(partial?: Partial<Profile>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  firstName?: string;

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  lastName?: string;

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  middleName?: string;

  @ApiProperty({ type: AddressDto })
  @Column('simple-json', { nullable: true })
  shippingAddress?: {
    province: string;
    city: string;
    barangay: string;
    street: string;
  };

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  phoneNo?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
