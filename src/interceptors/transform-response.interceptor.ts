import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: T;
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(({ message, data, success }) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        success: success === undefined,
        message,
        data,
      })),
    );
  }
}
