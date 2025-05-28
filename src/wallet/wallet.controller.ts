import { Controller, Get, Post, Delete, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto, WalletTransactionDto } from './dto/wallet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }
@ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get(':userId')
  async getWallet(@Param('userId') userId: string) {
    return this.walletService.getWalletByUserId(userId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post(':userId/transaction')
  async addTransaction(@Param('userId') userId: string, @Body() transactionDto: WalletTransactionDto) {
    return this.walletService.addTransaction(userId, transactionDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get(':userId/transactions')
  async getTransactions(@Param('userId') userId: string) {
    return this.walletService.getTransactions(userId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  async deleteWallet(@Param('userId') userId: string) {
    return this.walletService.deleteWallet(userId);
  }
}
