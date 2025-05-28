import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
export class LoginDto {
    @ApiProperty({example: "example@example.com", description: "User's email address"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "password123", description: "User's password"})
    password: string;
}