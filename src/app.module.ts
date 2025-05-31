import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { WalletModule } from './wallet/wallet.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { PricingModule } from './pricing/pricing.module';
import { SlotsModule } from './slots/slots.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, AddressModule, WalletModule, OrderModule, PaymentModule, ReviewModule, PricingModule, SlotsModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
