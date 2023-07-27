import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EntityNotFoundErrorFilter } from './filters/entity-not-found-error.filter';
import { useContainer } from 'class-validator';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new EntityNotFoundErrorFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(4000);
}
bootstrap();
