import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { PaginateQueryDto } from '../../lib/pagination/paginate-query.dto.lib';
import { ApiProperty } from '@nestjs/swagger';

export class ProductQueryDto extends PaginateQueryDto {
  @ApiProperty({ description: 'Filter by shop.', required: false })
  @IsNumberString()
  @IsOptional()
  shopId?: number;

  @ApiProperty({ description: 'Filter by product name.', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Filter by greater than or equal of the minimum price.',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  priceMin?: number;

  @ApiProperty({
    description: 'Filter by less than or equal of the maximum price.',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  priceMax?: number;

  @ApiProperty({ description: 'Filter by product brand.', required: false })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty({
    required: false,
    enum: ['name', '-name', 'price', '-price', 'brand', '-brand'],
    description: 'The dash means in a decending order.',
  })
  @IsIn(['name', '-name', 'price', '-price', 'brand', '-brand'])
  @IsOptional()
  sort?: string;
}
