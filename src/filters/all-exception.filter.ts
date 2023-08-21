import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiProperty } from '@nestjs/swagger';

export interface ExceptionResponse {
  statusCode: number;
  success: boolean;
  message: string;
  timestamp: string;
  path: string;
}

export class StandardExceptionResponse implements ExceptionResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ example: false })
  success: boolean;

  message: string;

  @ApiProperty({ description: 'Timestamp in ISO String' })
  timestamp: string;

  @ApiProperty({ description: 'URL path of the request.' })
  path: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) console.log(exception);

    const responseBody: ExceptionResponse = {
      statusCode: httpStatus,
      success: false,
      message:
        httpStatus === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Internal Server Error'
          : exception?.response?.message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
