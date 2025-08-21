import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}
  async register(email: string, password: string, name: string) {
    const exists = await this.users.findByEmail(email);
    if (exists) throw new BadRequestException('Email already registered');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.users.create({ email, password: hash, name });
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email, name: user.name });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }
  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email, name: user.name });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }
}