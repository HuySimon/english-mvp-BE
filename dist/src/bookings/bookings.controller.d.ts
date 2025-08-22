import { JwtService } from '@nestjs/jwt';
import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private bookings;
    private jwt;
    constructor(bookings: BookingsService, jwt: JwtService);
    create(req: any, body: {
        teacherId: number;
        slot: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        teacherId: number;
        userId: number;
        slotTime: string;
        status: string;
    }>;
    my(req: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        teacherId: number;
        userId: number;
        slotTime: string;
        status: string;
    }[]>;
}
