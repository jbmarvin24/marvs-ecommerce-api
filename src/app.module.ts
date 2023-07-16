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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'batman@dev',
      database: 'marvs_ecommerce',
      entities: [User, Role, Shop],
      synchronize: true,
      // dropSchema: true,
    }),
    UserModule,
    RoleModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
