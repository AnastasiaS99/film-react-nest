import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Импорт логгеров
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';
import { DevLogger } from './logger/dev.logger';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  // Получение переменных окружения через ConfigService
  const logFormat = configService.get<string>('LOG_FORMAT', 'dev');
  const port = configService.get<number>('PORT', 3000);
  const corsOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:5173');

  // Регистрация глобального ValidationPipe перед запуском сервера
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // Настройка логов
  switch (logFormat) {
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
    default:
      app.useLogger(new DevLogger());
  }

  // Основные настройки
  app.setGlobalPrefix('api/afisha');
  app.enableCors({ origin: corsOrigin, credentials: true });
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/content/afisha/',
  });

  await app.listen(port);
  console.log(`Сервер запущен на порту ${port}`);
}

main();