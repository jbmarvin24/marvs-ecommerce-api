import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopModule } from './shop/shop.module';
import { CategoryModule } from './category/category.module';
import { VoucherTypeModule } from './voucher-type/voucher-type.module';
import { VoucherModule } from './voucher/voucher.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ProductModule } from './product/product.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),

    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    AuthModule,
    UserModule,
    ShopModule,
    CategoryModule,
    VoucherTypeModule,
    VoucherModule,
    ProfileModule,
    ProductModule,
    WishlistModule,
    CartModule,
    OrderModule,
  ],
})
export class AppModule {}
