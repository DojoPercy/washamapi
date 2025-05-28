import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty({
    description: 'ID of the order being reviewed',
    example: 'a1b2c3d4e5',
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    description: 'Rating given to the service (1 to 5)',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Optional comment for the review',
    example: 'Great service! Clothes were well cleaned and on time.',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
