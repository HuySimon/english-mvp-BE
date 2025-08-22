import { PrismaService } from '../../prisma/prisma.service';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, teacherId: number, slot: string, status?: 'trial' | 'paid'): Promise<{
        id: number;
        createdAt: Date;
        teacherId: number;
        userId: number;
        slotTime: string;
        status: string;
    }>;
    listByUser(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        teacherId: number;
        userId: number;
        slotTime: string;
        status: string;
    }[]>;
}
