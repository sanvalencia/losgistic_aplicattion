import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Logistica Firplak API')
    .setDescription('API REST para la logistica usando nestjs y mysql')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
