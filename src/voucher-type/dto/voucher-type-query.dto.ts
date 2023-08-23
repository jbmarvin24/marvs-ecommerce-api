import { IsOptional, IsString } from 'class-validator';
import { PaginateQueryDto } from '../../lib/pagination/paginate-query.dto.lib';
import { ApiProperty } from '@nestjs/swagger';

export class VoucherTypeQueryDto extends PaginateQueryDto {
  @ApiProperty({
    description: 'Voucher type name.',
    example: 'Free Shipping',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
