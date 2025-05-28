import { Body, Controller, Post, Version, Get , UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authservice : AuthService){}
@Post('login')
@Version('1')
async login(@Body() loginDto:LoginDto): Promise<{ accessToken: string }> {
    return await this.authservice.login(loginDto);
}
@Post('register')
@Version('1')
async register(@Body() registerDto: CreateUserDto): Promise<any> {
   
    return await this.authservice.register(registerDto);}



@Get('me')
@Version('1')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
async getMe(@Request()  req){
    const userId = req.user.sub;
    return await this.authservice.getMe(userId); 
}
}


