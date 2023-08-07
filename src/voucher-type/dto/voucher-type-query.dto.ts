import { IsOptional, IsString } from 'class-validator';
import { PaginateQueryDto } from '../../lib/pagination/paginate-query.dto.lib';

export class VoucherTypeQueryDto extends PaginateQueryDto {
  @IsString()
  @IsOptional()
  name?: string;
}
