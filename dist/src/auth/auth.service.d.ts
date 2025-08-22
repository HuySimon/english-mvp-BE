import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private users;
    private jwt;
    constructor(users: UsersService, jwt: JwtService);
    register(email: string, password: string, name: string): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
}
