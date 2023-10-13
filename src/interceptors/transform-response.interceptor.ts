import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ISuccessResponse<T> {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: T;
}

export class SuccessResponse<T> implements ISuccessResponse<T> {
  @ApiProperty({ description: 'Response status of the request', example: 200 })
  statusCode?: number;

  @ApiProperty({ description: 'If the operation is successful or not.' })
  success?: boolean;

  @ApiProperty({
    description: 'Additional description of the response',
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
        success: success === undefined ? true : success,
        message,
        data,
      })),
    );
  }
}
