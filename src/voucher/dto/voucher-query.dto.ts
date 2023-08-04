import { IsNumberString, IsOptional } from 'class-validator';

export class VoucherQueryDto {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  pageSize?: number;
}
