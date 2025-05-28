import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWalletDto, WalletTransactionDto, } from './dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async createWallet(dto: CreateWalletDto) {
    const existingWallet = await this.prisma.wallet.findUnique({ where: { userId: dto.userId } });
    if (existingWallet) throw new BadRequestException('Wallet already exists for this user');

    return this.prisma.wallet.create({
      data: {
        userId: dto.userId,
        credits: 0,
      },
    });
  }

  async getWalletByUserId(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      include: { transactions: true },
    });
    if (!wallet) throw new NotFoundException('Wallet not found');
    return wallet;
  }

  async addTransaction(userId: string, dto: WalletTransactionDto) {
    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new NotFoundException('Wallet not found');

    // Calculate new balance
    let newCredits = wallet.credits;
    if (dto.type === 'credit') {
      newCredits += dto.amount;
    } else if (dto.type === 'debit') {
      if (wallet.credits < dto.amount) throw new BadRequestException('Insufficient funds');
      newCredits -= dto.amount;
    }

    // Use a transaction to ensure atomicity
    return this.prisma.$transaction(async (prisma) => {
      const updatedWallet = await prisma.wallet.update({
        where: { id: wallet.id },
        data: { credits: newCredits },
      });

      const transaction = await prisma.walletTransaction.create({
        data: {
          walletId: wallet.id,
          amount: dto.amount,
          type: dto.type,
          description: dto.description,
        },
      });

      return { wallet: updatedWallet, transaction };
    });
  }

  async getTransactions(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new NotFoundException('Wallet not found');

    return this.prisma.walletTransaction.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteWallet(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new NotFoundException('Wallet not found');

    await this.prisma.walletTransaction.deleteMany({ where: { walletId: wallet.id } });
    await this.prisma.wallet.delete({ where: { id: wallet.id } });

    return { message: 'Wallet and transactions deleted' };
  }
}
