import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    const result = await this.filmsService.findAll(); 
    return {
      ...result,
      code: 200, 
    };
  }

  @Get(':id/schedule')
  async findSchedule(@Param('id') id: string) {
    const schedule = await this.filmsService.findSchedule(id);
    return {
      ...schedule,
      code: 200, 
    };
  }
}
