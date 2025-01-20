/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsOptional()
  @IsEnum(['user', 'admin'], { message: "Role must be either 'user' or admin" })
  role: string = 'user';

  @IsInt()
  washCount: number = 0;

  @IsBoolean()
  premium: boolean = false;

  @IsBoolean()
  verifiedPhone: boolean = false;

  @IsOptional()
  @IsString()
  address?: string;

  @Type(() => Date)
  @IsDate()
  createdAt: Date = new Date();

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  lastLogin?: Date;

  @IsInt()
  loyaltyPoints: number = 0;

  @IsOptional()
  @IsString()
  gender?: string;
}
