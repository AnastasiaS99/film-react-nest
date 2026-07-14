import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
// Объявление класса
export class JsonLogger implements LoggerService {
  private formatMessage(level: string, message: string | object | Error, context?: string[]) {
    return JSON.stringify({
      level,
      message,
      timestamp: new Date().toISOString(),
      context: context && context.length ? context : undefined,
    });
  }
// Стандартный лог
  log(message: string | object | Error, ...optionalParams: string[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }
// Лог ошибки
  error(message: string | object | Error, ...optionalParams: string[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }
// Лог для предупреждений
  warn(message: string | object | Error, ...optionalParams: string[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }
// Отладка
  debug(message: string | object | Error, ...optionalParams: string[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }
// Расширенный лог
  verbose(message: string | object | Error, ...optionalParams: string[]) {
    console.log(this.formatMessage('verbose', message, optionalParams));
  }
}