import { Expose } from 'class-transformer';
import { Response } from '../../interceptors/transform-response.interceptor';

export class UserDto<T> implements Response<T> {
  constructor(partial?: Partial<Response<T>>) {
    Object.assign(this, partial);
  }

  @Expose()
  data: T;

  @Expose()
  message?: string;

  @Expose()
  success?: boolean;
}
