import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { ProductService } from '../product/product.service';
import { ShopService } from '../shop/shop.service';
import { VoucherService } from '../voucher/voucher.service';
import { Response } from '../interceptors/transform-response.interceptor';
import { Product } from '../product/entities/product.entity';
import { Voucher } from '../voucher/entities/voucher.entity';
import { Shop } from '../shop/entities/shop.entity';
import { ProductQuery } from './dto/product-query.dto';

interface PaginatedProduct {
  count: number;
  results: Product[];
}

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
    @Query() query: ProductQuery,
  ): Promise<Response<PaginatedProduct>> {
    console.log(query);

    const { count, products } = await this.productService.findAllPaginated(
      query,
    );

    return {
      data: {
        count,
        results: products,
      },
    };
  }

  @Get('shops')
  async shops(): Promise<Response<Shop[]>> {
    return {
      data: await this.shopService.findAll(),
    };
  }

  @Get('vouchers')
  async vouchers(): Promise<Response<Voucher[]>> {
    return {
      data: await this.voucherService.findAll(),
    };
  }
}
