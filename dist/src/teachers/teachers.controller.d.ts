import { TeachersService } from './teachers.service';
export declare class TeachersController {
    private teachers;
    constructor(teachers: TeachersService);
    list(q?: string, country?: string, maxPrice?: string, tag?: string): Promise<{
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
    get(id: string): Promise<{
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
