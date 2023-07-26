import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { ProductService } from '../product/product.service';
import { ShopService } from '../shop/shop.service';
import { VoucherService } from '../voucher/voucher.service';

@Public()
@Controller('search')
export class SearchController {
  constructor(
    private productService: ProductService,
    private shopService: ShopService,
    private voucherService: VoucherService,
  ) {}

  @Get('products')
  async products() {
    return await this.productService.findAll();
  }

  @Get('shops')
  async shops() {
    return await this.shopService.findAll();
  }

  @Get('vouchers')
  async vouchers() {
    return await this.voucherService.findAll();
  }
}
