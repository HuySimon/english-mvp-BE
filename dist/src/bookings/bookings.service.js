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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BookingsService = class BookingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, teacherId, slot, status = 'trial') {
        const s = await this.prisma.slot.findFirst({ where: { teacherId, isoTime: slot } });
        if (!s)
            throw new common_1.BadRequestException('Slot not available');
        if (s.booked)
            throw new common_1.BadRequestException('Slot already booked');
        const conflict = await this.prisma.booking.findFirst({ where: { userId, slotTime: slot } });
        if (conflict)
            throw new common_1.BadRequestException('You already booked a class at this time');
        const result = await this.prisma.$transaction(async (tx) => {
            await tx.slot.update({ where: { id: s.id }, data: { booked: true } });
            const booking = await tx.booking.create({ data: { userId, teacherId, slotTime: slot, status } });
            return booking;
        });
        return result;
    }
    listByUser(userId) { return this.prisma.booking.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }); }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map