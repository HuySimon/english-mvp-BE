import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}
  async list(query: { q?: string; country?: string; maxPrice?: number; tag?: string }) {
    const { q, country, maxPrice, tag } = query; const where: any = {};
    if (country) where.country = country;
    if (typeof maxPrice === 'number') where.pricePerHour = { lte: maxPrice };
    if (tag) where.tags = { contains: tag };
    if (q) where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { headline: { contains: q, mode: 'insensitive' } },
      { bio: { contains: q, mode: 'insensitive' } },
    ];
    const teachers = await this.prisma.teacher.findMany({ where, orderBy: { rating: 'desc' } });
    const result = await Promise.all(teachers.map(async t => ({
      ...t,
      tags: t.tags.split(','),
      availableSlots: (await this.prisma.slot.findMany({ where: { teacherId: t.id, booked: false }, take: 9, orderBy: { isoTime: 'asc' } })).map(s => s.isoTime),
    })));
    return result;
  }
  async get(id: number) {
    const t = await this.prisma.teacher.findUnique({ where: { id } });
    if (!t) return null;
    const slots = await this.prisma.slot.findMany({ where: { teacherId: id, booked: false }, orderBy: { isoTime: 'asc' } });
    return { ...t, tags: t.tags.split(','), availableSlots: slots.map(s => s.isoTime) };
  }
}