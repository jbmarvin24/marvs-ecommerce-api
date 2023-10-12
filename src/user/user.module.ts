import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ShopModule } from '../shop/shop.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ShopModule, OrderModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
