import { IsString, IsNumber, IsArray, IsDate } from 'class-validator';

// Ответ API с результатами и общей информацией
export class ApiResponseDto<T> {
  @IsNumber()
  total: number;

  @IsArray()
  items: T[];
}

// Описание DTO для фильма
export class FilmDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @IsString({ each: true }) // массив строк
  tags: string[];

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  cover: string;
}

// Описание DTO для расписания сеансов кинотеатра
export class ScheduleDto {
  @IsString()
  id: string;

  @IsDate()
  daytime: Date;

  @IsNumber()
  hall: number;

  @IsNumber()
  rows: number;

  @IsNumber()
  seats: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  taken: string[];
}