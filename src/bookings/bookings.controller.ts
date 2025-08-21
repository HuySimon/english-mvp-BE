import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BookingsService } from './bookings.service';
import { JwtGuard } from '../common/jwt.guard';
@Controller('bookings')
export class BookingsController {
  constructor(private bookings: BookingsService, private jwt: JwtService) {}
  @UseGuards(JwtGuard)
  @Post() create(@Req() req: any, @Body() body: { teacherId: number; slot: string }) {
    const userId = req.user.sub as number; return this.bookings.create(userId, Number(body.teacherId), body.slot, 'trial');
  }
  @UseGuards(JwtGuard)
  @Get('me') my(@Req() req: any) { const userId = req.user.sub as number; return this.bookings.listByUser(userId); }
}