import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
@Controller('teachers')
export class TeachersController {
  constructor(private teachers: TeachersService) {}
  @Get() list(@Query('q') q?: string, @Query('country') country?: string, @Query('maxPrice') maxPrice?: string, @Query('tag') tag?: string) {
    const max = maxPrice ? Number(maxPrice) : undefined; return this.teachers.list({ q, country, maxPrice: max, tag });
  }
  @Get(':id') get(@Param('id') id: string) { return this.teachers.get(Number(id)); }
}