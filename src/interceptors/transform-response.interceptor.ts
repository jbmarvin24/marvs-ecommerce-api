import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: T;
}

export class SuccessResponse<T> implements Response<T> {
  @ApiProperty({ description: 'Response status', example: 200 })
  statusCode?: number;

  @ApiProperty()
  success?: boolean;

  @ApiProperty({
    description: 'Additional description of the reponse',
  })
  message?: string;

  @ApiProperty({ description: 'The response data' })
  data?: T;
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<T>> {
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
