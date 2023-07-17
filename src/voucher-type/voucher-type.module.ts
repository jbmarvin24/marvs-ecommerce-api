import { Module } from '@nestjs/common';
import { VoucherTypeService } from './voucher-type.service';
import { VoucherTypeController } from './voucher-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherType } from './entities/voucher-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoucherType])],
  controllers: [VoucherTypeController],
  providers: [VoucherTypeService],
})
export class VoucherTypeModule {}
