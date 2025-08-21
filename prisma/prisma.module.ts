import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // để module này global, không cần import nhiều lần
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
