import { IsOptional, IsString } from 'class-validator';
import { PaginateQueryDto } from '../../lib/pagination/paginate-query.dto.lib';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryQueryDto extends PaginateQueryDto {
  @ApiProperty({ description: 'Filter by category name', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
