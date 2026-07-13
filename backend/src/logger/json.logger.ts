import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
// Объявление класса
export class JsonLogger implements LoggerService {
  private formatMessage(level: string, message: any, ...optionalParams: any[]) {
    return JSON.stringify({
      level,
      message,
      timestamp: new Date().toISOString(),
      context: optionalParams.length ? optionalParams : undefined,
    });
  }
// Стандартный лог
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }
// Лог для ошибок
  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }
// Лог для предупреждений
  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }
// Отладка
  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }
// Подробный лог
  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, optionalParams));
  }
}