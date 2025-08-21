import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, teacherId: number, slot: string, status: 'trial' | 'paid' = 'trial') {
    const s = await this.prisma.slot.findFirst({ where: { teacherId, isoTime: slot } });
    if (!s) throw new BadRequestException('Slot not available');
    if (s.booked) throw new BadRequestException('Slot already booked');
    const conflict = await this.prisma.booking.findFirst({ where: { userId, slotTime: slot } });
    if (conflict) throw new BadRequestException('You already booked a class at this time');
    const result = await this.prisma.$transaction(async (tx) => {
      await tx.slot.update({ where: { id: s.id }, data: { booked: true } });
      const booking = await tx.booking.create({ data: { userId, teacherId, slotTime: slot, status } });
      return booking;
    });
    return result;
  }
  listByUser(userId: number) { return this.prisma.booking.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }); }
}