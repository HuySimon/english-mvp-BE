import { PrismaService } from '../../prisma/prisma.service';
export declare class TeachersService {
    private prisma;
    constructor(prisma: PrismaService);
    list(query: {
        q?: string;
        country?: string;
        maxPrice?: number;
        tag?: string;
    }): Promise<{
        tags: string[];
        availableSlots: string[];
        name: string;
        id: number;
        country: string;
        accent: string;
        pricePerHour: number;
        rating: number;
        headline: string;
        bio: string;
        avatarUrl: string;
    }[]>;
    get(id: number): Promise<{
        tags: string[];
        availableSlots: string[];
        name: string;
        id: number;
        country: string;
        accent: string;
        pricePerHour: number;
        rating: number;
        headline: string;
        bio: string;
        avatarUrl: string;
    } | null>;
}
