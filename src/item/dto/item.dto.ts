/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ description: 'Name of the item' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Average weight of the item in kilograms' })
  @IsNotEmpty()
  @IsNumber()
  avgWeight: number;

  @ApiProperty({ description: 'ID of the category this item belongs to' })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
