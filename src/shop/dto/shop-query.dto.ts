import { IsOptional, IsString } from 'class-validator';
import { PaginateQueryDto } from '../../lib/pagination/paginate-query.dto.lib';

export class ShopQueryDto extends PaginateQueryDto {
  @IsString()
  @IsOptional()
  name?: string;
}
