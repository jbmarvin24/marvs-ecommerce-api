import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { PaginateQueryDto } from '../../lib/pagination/paginate-query.dto.lib';

export class ProductQueryDto extends PaginateQueryDto {
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
}
