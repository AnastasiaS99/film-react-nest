import { IsString, IsNumber, IsArray, IsEmail, IsPhoneNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// DTO для информации о билете
export class TicketDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

// DTO для создания заказа
export class CreateOrderDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber(null) // или указать конкретный регион, например 'RU'
  phone: string;

  @IsArray()
  @ValidateNested({ each: true }) // валидируется каждый элемент массива
  @Type(() => TicketDto) // преобразование PlainToInstance
  tickets: TicketDto[];
}

// DTO для ответа с информацией о заказе
export class OrderResponseItemDto extends TicketDto {
  @IsString()
  id: string;
}