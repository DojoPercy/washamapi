import { Controller, Post, Get, Param, Request, UseGuards, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '../auth/auth.guard'; 
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders/:orderId/payment')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
 @UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
  async initiatePayment(@Param('orderId') orderId: string, @Request() req) {
    const userId = req.user.sub;
    return this.paymentService.initiatePayment(orderId, userId);
  }

  @Get()
  async getPaymentDetails(@Param('orderId') orderId: string, @Request() req) {
    const userId = req.user.id;
    return this.paymentService.getPaymentDetails(orderId, userId);
  }

   @Post("cash")
  @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
  async recordCashPayment(
    @Param('orderId') orderId: string,
    @Body('amount') amount: number,
    @Request() req
  ) {
    const valetId = req.user.id; 
    return this.paymentService.recordCashPayment(orderId, valetId, amount);
  }
}
