import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { ShopModule } from './shop/shop.module';
import { Shop } from './shop/entities/shop.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { VoucherTypeModule } from './voucher-type/voucher-type.module';
import { VoucherType } from './voucher-type/entities/voucher-type.entity';
import { VoucherModule } from './voucher/voucher.module';
import { Voucher } from './voucher/entities/voucher.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'batman@dev',
      database: 'marvs_ecommerce',
      entities: [User, Role, Shop, Category, VoucherType, Voucher],
      synchronize: true,
      // dropSchema: true,
    }),
    UserModule,
    RoleModule,
    ShopModule,
    CategoryModule,
    VoucherTypeModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
