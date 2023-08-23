import { Expose, Type } from 'class-transformer';
import { ISuccessResponse } from '../../interceptors/transform-response.interceptor';
import { User } from '../entities/user.entity';
import { PaginatedResult } from '../../lib/pagination/paginator.lib';

class UserPaginationResult {
  @Expose()
  count: number;

  @Expose()
  @Type(() => User)
  results: User[];
}

export class UserPaginatedResponse
  implements ISuccessResponse<PaginatedResult<User>>
{
  constructor(partial?: Partial<UserPaginatedResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @Type(() => UserPaginationResult)
  data: UserPaginationResult;

  @Expose()
  message?: string;

  @Expose()
  success?: boolean;
}

export class UserDto<T> implements ISuccessResponse<T> {
  constructor(partial?: Partial<ISuccessResponse<T>>) {
    Object.assign(this, partial);
  }

  @Expose()
  data: T;

  @Expose()
  message?: string;

  @Expose()
  success?: boolean;
}
