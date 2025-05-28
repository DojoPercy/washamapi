import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, ServiceType } from '../types/order.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateBagEstimateDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  smallCount: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  mediumCount: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  largeCount: number;

  @ApiProperty({ example: 5.0 })
  @IsNumber()
  smallPrice: number;

  @ApiProperty({ example: 7.5 })
  @IsNumber()
  mediumPrice: number;

  @ApiProperty({ example: 10.0 })
  @IsNumber()
  largePrice: number;
}

export class CreateOrderItemDto {
  @ApiProperty({ enum: ServiceType })
  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @ApiProperty({ example: 25.5 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 'Handle with care' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ type: CreateBagEstimateDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBagEstimateDto)
  bagEstimate?: CreateBagEstimateDto;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'address_123' })
  @IsNotEmpty()
  @IsString()
  addressId: string;

  @ApiProperty({ example: '2025-05-28T10:00:00Z' })
  @IsDateString()
  pickupDate: string;

  @ApiProperty({ example: '9AM-12PM' })
  @IsNotEmpty()
  @IsString()
  pickupSlot: string;

  @ApiProperty({ example: '2025-05-30T16:00:00Z' })
  @IsDateString()
  deliveryDate: string;

  @ApiProperty({ example: '1PM-5PM' })
  @IsNotEmpty()
  @IsString()
  deliverySlot: string;

  @ApiPropertyOptional({ example: 'Leave at front door if no answer' })
  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  services: CreateOrderItemDto[];
}

export class UpdateOrderDto {
  @ApiProperty({ example: 'order_123' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiPropertyOptional({ example: 'Please handle with care' })
  @IsOptional()
  @IsString()
  comment?: string;

}

export class ServiceDto {
  @ApiProperty({ enum: ServiceType })
  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @ApiProperty({ example: 10.5 })
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class EstimateOrderDto {
  @ApiProperty({ type: [ServiceDto], description: 'List of services with their type and price' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  services: ServiceDto[];

  @ApiProperty({ description: 'Any special instructions for the order', required: false, example: 'Please call on arrival' })
  @IsOptional()
  @IsString()
  specialInstructions?: string;
}

export class RescheduleOrderDto {
  @ApiProperty({ description: 'New pickup date', example: '2025-06-01' })
  @IsString() // Or use @IsDateString() if it must be a valid ISO date
  @IsNotEmpty()
  pickupDate: string;

  @ApiProperty({ description: 'Time slot for pickup', example: '9AM - 12PM' })
  @IsString()
  @IsNotEmpty()
  pickupSlot: string;

  @ApiProperty({ description: 'New delivery date', example: '2025-06-03' })
  @IsString() // Or use @IsDateString()
  @IsNotEmpty()
  deliveryDate: string;

  @ApiProperty({ description: 'Time slot for delivery', example: '2PM - 5PM' })
  @IsString()
  @IsNotEmpty()
  deliverySlot: string;
}

