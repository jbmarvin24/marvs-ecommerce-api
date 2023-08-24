import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { PaginateQueryDto } from '../../lib/pagination/paginate-query.dto.lib';

export class ProductQueryDto extends PaginateQueryDto {
  @IsNumberString()
  @IsOptional()
  shopId: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumberString()
  @IsOptional()
  priceMin?: number;

  @IsNumberString()
  @IsOptional()
  priceMax?: number;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsIn(['name', '-name', 'price', '-price', 'brand', '-brand'])
  @IsOptional()
  sort?: string;
}
