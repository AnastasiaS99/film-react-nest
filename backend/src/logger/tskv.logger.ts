import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
// Объявление класса
export class TskvLogger implements LoggerService {

  private formatValue(value: string): string {
    if (!value) return '';
    return value.replace(/[\n\t]/g, ' ');
  }

  private toFieldString(value: unknown): string {
    if (typeof value === 'string') {
      return value;
    }
    if (value instanceof Error) {
      return value.stack ?? value.message;
    }
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  private formatMessage(
    level: string,
    message: string | object | Error,
    ...optionalParams: unknown[]
  ): string {
    const date = new Date().toISOString();
    const messageStr =
      typeof message === 'string'
        ? message
        : JSON.stringify(message);
    let result = `timestamp=${date}\tlevel=${level}\tmessage=${this.formatValue(messageStr)}`;

    optionalParams.forEach((param, index) => {
      result += `\tp${index}=${this.formatValue(this.toFieldString(param))}`;
    });

    return result + '\n';
  }
// Разные уровни логгирования
  log(message: string | object | Error, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }
// Ошибки
  error(message: string | object | Error, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }
// Предупреждения
  warn(message: string | object | Error, ...optionalParams: unknown[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }
// Отладка
  debug(message: string | object | Error, ...optionalParams: unknown[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }
// Расширенный лог
  verbose(message: string | object | Error, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
// Критически важные ошибки
  fatal(message: string | object | Error, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('fatal', message, ...optionalParams));
  }
}