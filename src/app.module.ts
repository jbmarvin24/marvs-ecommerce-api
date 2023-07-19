import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ShopModule } from './shop/shop.module';
import { Shop } from './shop/entities/shop.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { VoucherTypeModule } from './voucher-type/voucher-type.module';
import { VoucherType } from './voucher-type/entities/voucher-type.entity';
import { VoucherModule } from './voucher/voucher.module';
import { Voucher } from './voucher/entities/voucher.entity';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'batman@dev',
      database: 'marvs_ecommerce',
      entities: [User, Profile, Shop, Category, VoucherType, Voucher],
      synchronize: true,
      // dropSchema: true,
    }),
    AuthModule,
    UserModule,
    ShopModule,
    CategoryModule,
    VoucherTypeModule,
    VoucherModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
