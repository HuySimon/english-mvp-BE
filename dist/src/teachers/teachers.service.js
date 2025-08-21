"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TeachersService = class TeachersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(query) {
        const { q, country, maxPrice, tag } = query;
        const where = {};
        if (country)
            where.country = country;
        if (typeof maxPrice === 'number')
            where.pricePerHour = { lte: maxPrice };
        if (tag)
            where.tags = { contains: tag };
        if (q)
            where.OR = [
                { name: { contains: q, mode: 'insensitive' } },
                { headline: { contains: q, mode: 'insensitive' } },
                { bio: { contains: q, mode: 'insensitive' } },
            ];
        const teachers = await this.prisma.teacher.findMany({ where, orderBy: { rating: 'desc' } });
        const result = await Promise.all(teachers.map(async (t) => ({
            ...t,
            tags: t.tags.split(','),
            availableSlots: (await this.prisma.slot.findMany({ where: { teacherId: t.id, booked: false }, take: 9, orderBy: { isoTime: 'asc' } })).map(s => s.isoTime),
        })));
        return result;
    }
    async get(id) {
        const t = await this.prisma.teacher.findUnique({ where: { id } });
        if (!t)
            return null;
        const slots = await this.prisma.slot.findMany({ where: { teacherId: id, booked: false }, orderBy: { isoTime: 'asc' } });
        return { ...t, tags: t.tags.split(','), availableSlots: slots.map(s => s.isoTime) };
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map