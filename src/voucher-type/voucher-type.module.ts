import { Module } from '@nestjs/common';
import { VoucherTypeService } from './voucher-type.service';
import { VoucherTypeController } from './voucher-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherType } from './entities/voucher-type.entity';
import { VoucherTypeMustExistConstraint } from './validations/voucher-type-must-exist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([VoucherType])],
  controllers: [VoucherTypeController],
  providers: [VoucherTypeService, VoucherTypeMustExistConstraint],
})
export class VoucherTypeModule {}
