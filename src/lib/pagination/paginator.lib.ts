import { SelectQueryBuilder } from 'typeorm';

export interface PaginatedResult<T> {
  count: number;
  results: T[];
}

export async function paginate<T>(
  qb: SelectQueryBuilder<T>,
  currentPage = 1,
  pageSize = 10,
): Promise<PaginatedResult<T>> {
  const count = await qb.getCount();

  const results = await qb
    .limit(pageSize)
    .offset((currentPage - 1) * pageSize)
    .getMany();

  return {
    count,
    results,
  };
}
