import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginateQueryDto {
  @ApiProperty({ description: 'Current Page', example: 1, required: false })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiProperty({ description: 'Page Size', example: 10, required: false })
  @IsNumberString()
  @IsOptional()
  pageSize?: number;
}
