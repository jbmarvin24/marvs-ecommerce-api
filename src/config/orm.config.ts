import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { Product } from '../product/entities/product.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Shop } from '../shop/entities/shop.entity';
import { User } from '../user/entities/user.entity';
import { VoucherType } from '../voucher-type/entities/voucher-type.entity';
import { Voucher } from '../voucher/entities/voucher.entity';
import { Wishlist } from '../wishlist/entities/wishlist.entity';
import { Cart } from '../cart/entities/cart.entity';
import { OrderParticular } from '../order/entities/order-particular.entity';
import { Order } from '../order/entities/order.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      User,
      Profile,
      Shop,
      Category,
      VoucherType,
      Voucher,
      Product,
      Wishlist,
      Cart,
      Order,
      OrderParticular,
    ],
    synchronize: true,
    dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA)),
  }),
);
