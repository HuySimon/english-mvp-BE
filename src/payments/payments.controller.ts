import { Body, Controller, Post } from '@nestjs/common';
@Controller('payments')
export class PaymentsController {
  @Post('checkout')
  checkout(@Body() body: { userId: number; teacherId: number; package: '5'|'10'|'20' }) {
    const amount = body.package === '20' ? 199 : body.package === '10' ? 119 : 69;
    return { clientSecret: 'demo_secret_123', amount, currency: 'USD', status: 'requires_confirmation' };
  }
}