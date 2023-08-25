import { IsOptional, IsString } from 'class-validator';
import { PaginateQueryDto } from '../../lib/pagination/paginate-query.dto.lib';
import { ApiProperty } from '@nestjs/swagger';

export class ShopQueryDto extends PaginateQueryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
