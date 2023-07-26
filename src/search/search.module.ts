import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { ProductModule } from '../product/product.module';
import { ShopModule } from '../shop/shop.module';
import { VoucherModule } from '../voucher/voucher.module';

@Module({
  imports: [ProductModule, ShopModule, VoucherModule],
  controllers: [SearchController],
})
export class SearchModule {}
