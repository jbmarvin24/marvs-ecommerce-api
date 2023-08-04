import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ShopQueryDto {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  pageSize?: number;

  @IsString()
  @IsOptional()
  name?: string;
}
