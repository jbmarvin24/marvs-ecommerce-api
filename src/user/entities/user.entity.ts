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

@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Expose()
  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Shop, (shop) => shop.user)
  shops: Shop[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.users)
  wishlist: Wishlist[];

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;
}
