import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Google Place ID from frontend autocomplete',
    example: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE',
  })
  @IsString()
  @IsNotEmpty()
  placeId: string;

  @ApiProperty({
    description: 'Label for the address (e.g., Home, Work)',
    example: 'Home',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiPropertyOptional({
    description: 'Additional instructions or description for the address',
    example: 'Ring the bell twice',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
