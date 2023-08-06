import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { ProductService } from '../product/product.service';
import { ShopService } from '../shop/shop.service';
import { VoucherService } from '../voucher/voucher.service';
import { Response } from '../interceptors/transform-response.interceptor';
import { Product } from '../product/entities/product.entity';
import { Voucher } from '../voucher/entities/voucher.entity';
import { Shop } from '../shop/entities/shop.entity';
import { ProductQueryDto } from '../product/dto/product-query.dto';
import { ShopQueryDto } from '../shop/dto/shop-query.dto';
import { VoucherQueryDto } from '../voucher/dto/voucher-query.dto';
import { PaginatedResult } from '../lib/paginator.lib';

@Public()
@Controller('search')
export class SearchController {
  constructor(
    private productService: ProductService,
    private shopService: ShopService,
    private voucherService: VoucherService,
  ) {}

  @Get('products')
  async products(
    @Query() query: ProductQueryDto,
  ): Promise<Response<PaginatedResult<Product>>> {
    return {
      data: await this.productService.findAllPaginated(query),
    };
  }

  @Get('shops')
  async shops(
    @Query() query: ShopQueryDto,
  ): Promise<Response<PaginatedResult<Shop>>> {
    return {
      data: await this.shopService.findAllPaginated(query),
    };
  }

  @Get('vouchers')
  async vouchers(
    @Query() query: VoucherQueryDto,
  ): Promise<Response<PaginatedResult<Voucher>>> {
    return {
      data: await this.voucherService.findAllPaginated(query),
    };
  }
}
