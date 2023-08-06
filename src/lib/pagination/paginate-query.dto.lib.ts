import { IsNumberString, IsOptional } from 'class-validator';

export class PaginateQueryDto {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  pageSize?: number;
}
