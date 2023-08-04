import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ProductQuery {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  pageSize?: number;

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
