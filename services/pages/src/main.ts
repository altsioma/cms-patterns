import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const config = app.get(ConfigService);

  const port = config.get<number>('PAGE_SERVICE_PORT') || 3001;
  const globalPrefix = config.get<string>('GLOBAL_PREFIX') || '';

  app.setGlobalPrefix(globalPrefix);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Page Service API')
    .setDescription('API управления динамическими страницами')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${globalPrefix}/pages/api-docs`, app, document);

  Logger.log(`Сервер запущен на порту ${port}`, 'Server');

  await app.listen(port, '0.0.0.0');
}
bootstrap();
