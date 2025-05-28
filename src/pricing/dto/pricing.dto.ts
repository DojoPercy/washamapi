import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum PriceCategory {
  BAG = 'BAG',
  DRY_CLEANING = 'DRY_CLEANING',
}

export class CreatePriceDto {
  @ApiProperty({
    enum: PriceCategory,
    description: 'Category of the price item',
    example: PriceCategory.BAG,
  })
  @IsEnum(PriceCategory)
  category: PriceCategory;

  @ApiProperty({
    description: 'Name of the price item',
    example: 'Shirt - Ironing',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Price per unit in GHS',
    example: 10.5,
  })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({
    description: 'Optional description of the item',
    example: 'Light starch included',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdatePriceDto extends PartialType(CreatePriceDto) {}
