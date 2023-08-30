import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Expose()
  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @ApiProperty()
  @Expose()
  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Shop, (shop) => shop.user)
  shops: Shop[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @ApiProperty()
  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;
}
