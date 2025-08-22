import { PrismaService } from '../../prisma/prisma.service';
type CreateUser = {
    email: string;
    password: string;
    name: string;
};
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUser): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: number;
        email: string;
        password: string;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
export {};
