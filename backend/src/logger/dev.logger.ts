import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
// Экспорт класса
export class DevLogger extends ConsoleLogger {}