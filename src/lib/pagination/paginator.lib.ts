import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { SelectQueryBuilder } from 'typeorm';

export interface PaginatedResult<T> {
  count: number;
  results: T[];
}

export class PaginatedResponse<T> implements PaginatedResult<T> {
  @ApiProperty()
  count: number;

  @ApiProperty()
  results: T[];
}

export async function paginate<T>(
  qb: SelectQueryBuilder<T>,
  currentPage = 1,
  pageSize = 10,
): Promise<PaginatedResult<T>> {
  const count = await qb.getCount();

  if (pageSize > 20) {
    throw new BadRequestException(
      'Page size must be less than or equal to 20.',
    );
  }

  const results = await qb
    .limit(pageSize)
    .offset((currentPage - 1) * pageSize)
    .getMany();

  return {
    count,
    results,
  };
}
