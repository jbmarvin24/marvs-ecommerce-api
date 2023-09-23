import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Marvs Ecommerce API')
    .setDescription(
      `My built Ecommerce API using Nest JS, TypeORM and Postgres.

Some useful links:
- [The Marvs Ecommerce API repository](https://github.com/jbmarvin24/marvs-ecommerce-api)
      `,
    )
    .setVersion('1.1')
    .addBearerAuth()
    .addTag('Authentications', '🔐')
    .addTag('Product', 'All about products👜🏀')
    .addTag('Voucher', 'Vouchers!😍💯')
    .addTag('Shop', 'All about shops🏪')
    .addTag('Cart', 'All about carts🛒')
    .addTag('Category', 'Available product categories')
    .addTag('User', 'Manage users🤵')
    .addTag('Profile', "Manage user's profile📃")
    .addTag('Wishlist', "User's wishlist🚀")
    .addTag('Voucher Type', 'Manage different types of vouchers')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Marvs Ecommerce API',
  });

  await app.listen(PORT);
  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
}
bootstrap();
