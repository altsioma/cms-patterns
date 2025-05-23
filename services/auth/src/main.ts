import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = app.get(ConfigService);
  const port = config.get<number>('AUTH_SERVICE_PORT') || 3001;
  const globalPrefix = config.get<string>('GLOBAL_PREFIX') || '';

  app.setGlobalPrefix(globalPrefix);

  Logger.log(`Сервер работает на порту ${port}`, 'Server');

  await app.listen(port, '0.0.0.0');
}
bootstrap();
