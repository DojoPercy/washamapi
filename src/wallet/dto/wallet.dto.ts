import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional,  IsEnum, IsString } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ description: 'User ID owning the wallet' })
  @IsNotEmpty()
  userId: string;
}

export class WalletTransactionDto {
  @ApiProperty({ description: 'Transaction amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Transaction type', enum: ['credit', 'debit'] })
  @IsEnum(['credit', 'debit'])
  type: 'credit' | 'debit';

  @ApiProperty({ description: 'Optional description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateWalletDto {
  @ApiProperty({ description: 'Update credits' })
  @IsNumber()
  credits: number;
}
