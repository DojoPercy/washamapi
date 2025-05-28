import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly PAYSTACK_SECRET = "sk_test_0ecfe90955b0335058179dfa7087da1d6d04ae49";

  async initiatePayment(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId }, include: { user: true } });  
    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found or not authorized');
    }

    if (order.paymentStatus === 'PAID') {
      throw new BadRequestException('Order already paid');
    }

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: order.user.email, 
        amount: order.totalAmount * 100, 
        currency: 'GHS',
        channels: ['mobile_money'],
        metadata: {
          orderId: order.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }

  async recordCashPayment(orderId: string, valetId: string, amount: number) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.paymentStatus === 'PAID') {
      throw new BadRequestException('Order already paid');
    }

    await this.prisma.payment.create({
      data: {
        orderId,
        amount,
        method: 'CASH',
        status: 'PAID',
      },
    });

    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
      },
    });

    return { message: 'Cash payment recorded successfully' };
  }

  async getPaymentDetails(orderId: string, userId: string) {
    const payment = await this.prisma.payment.findFirst({
      where: { orderId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (order.userId !== userId) {
      throw new BadRequestException('Not authorized to view this payment');
    }

    return payment;
  }

//   async verifyPayment(reference: string) {
//   const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
//     headers: {
//       Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
//     },
//   });

//   const data = response.data.data;

//   if (data.status === 'success') {
//     // Update order: mark as PAID
//     await this.prisma.payment.update({
//       where: { reference },
//       data: {
//         status: 'PAID',
//         paidAt: new Date(data.paid_at),
//       },
//     });

//     await this.prisma.order.update({
//       where: { id: data.metadata.orderId },
//       data: {
//         paymentStatus: 'PAID',
//       },
//     });

//     return { success: true };
//   } else {
//     return { success: false, reason: data.gateway_response };
//   }
// }


//   async processRefund(orderId: string, adminId: string) {
//     const payment = await this.prisma.payment.findFirst({
//       where: { orderId },
//     });

//     if (!payment || payment.status !== 'PAID') {
//       throw new BadRequestException('No payment to refund');
//     }

//     // Implement refund logic with Paystack if applicable

//     await this.prisma.payment.update({
//       where: { id: payment.id },
//       data: {
//         status: 'REFUNDED',
//       },
//     });

//     await this.prisma.order.update({
//       where: { id: orderId },
//       data: {
//         paymentStatus: 'REFUNDED',
//       },
//     });

//     return { message: 'Refund processed successfully' };
//   }
}
