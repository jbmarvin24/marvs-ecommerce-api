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
import { ShopQuery } from '../shop/dto/shop-query.dto';
import { VoucherQueryDto } from '../voucher/dto/voucher-query.dto';

export interface PaginatedResult<T> {
  count: number;
  results: T[];
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
  ): Promise<Response<PaginatedResult<Product>>> {
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
  async shops(
    @Query() query: ShopQuery,
  ): Promise<Response<PaginatedResult<Shop>>> {
    console.log(query);

    const { count, shops } = await this.shopService.findAllPaginated(query);

    return {
      data: {
        count,
        results: shops,
      },
    };
  }

  @Get('vouchers')
  async vouchers(
    @Query() query: VoucherQueryDto,
  ): Promise<Response<PaginatedResult<Voucher>>> {
    const { count, vouchers } = await this.voucherService.findAllPaginated(
      query,
    );

    return {
      data: {
        count,
        results: vouchers,
      },
    };
  }
}
