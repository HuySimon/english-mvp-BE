import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { BookingsModule } from './bookings/bookings.module';
import { PrismaService } from './prisma.service';
import { PaymentsModule } from './payments/payments.module';
@Module({
  imports: [PrismaModule, AuthModule, UsersModule, TeachersModule, BookingsModule, PaymentsModule],
  providers: [PrismaService],
})
export class AppModule {}