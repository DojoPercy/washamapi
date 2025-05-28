import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export enum DetergentType {
  SCENTED = 'SCENTED',
  HYPOALLERGENIC = 'HYPOALLERGENIC',
  // add others as needed
}

export enum StarchLevel {
  NONE = 'NONE',
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  HEAVY = 'HEAVY',
}

export enum DryingMethod {
  AIR_DRY = 'AIR_DRY',
  TUMBLE_DRY = 'TUMBLE_DRY',
  // add others if needed
}

export enum IroningLevel {
  NONE = 'NONE',
  LIGHT = 'LIGHT',
  MEDIUM = 'MEDIUM',
  HEAVY = 'HEAVY',
}

export class CreateCleaningPreferencesDto {
  @ApiProperty({ enum: DetergentType, default: DetergentType.SCENTED })
  @IsEnum(DetergentType)
  detergentType: DetergentType;

  @ApiProperty({ default: true })
  @IsBoolean()
  fabricSoftener: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  oxiclean: boolean;

  @ApiProperty({ enum: StarchLevel, default: StarchLevel.NONE })
  @IsEnum(StarchLevel)
  starchLevel: StarchLevel;

  @ApiProperty({ enum: DryingMethod, default: DryingMethod.AIR_DRY })
  @IsEnum(DryingMethod)
  dryingMethod: DryingMethod;

  @ApiProperty({ enum: IroningLevel, default: IroningLevel.NONE })
  @IsEnum(IroningLevel)
  ironingLevel: IroningLevel;

  @ApiPropertyOptional({ type: String, description: 'Special instructions or notes' })
  @IsOptional()
  @IsString()
  specialNotes?: string;

  @ApiPropertyOptional({ type: String, description: 'User ID (ObjectId)' })
  @IsOptional()
  @IsString()
  userId?: string;
}
