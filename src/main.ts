import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { json } from 'express';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ["https://english-mvp-k1pl.vercel.app/"], credentials: true });
  app.use(json({ limit: '1mb' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
}
bootstrap();