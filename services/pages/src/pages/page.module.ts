import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PageController } from './page.controller';
import { PageService } from './page.service';
import { Page } from './page.entity';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy'; // предполагается, что у тебя общий auth модуль

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Page]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [PageController],
  providers: [PageService, JwtStrategy],
})
export class PageModule {}
