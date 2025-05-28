import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/users.dto';

@Injectable()
export class AuthService {
    constructor(private userService : UserService,private jwtService: JwtService){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...result } = user; 

                return result;
            }
        }
        return null
    }

    async generateToken(payload: any): Promise<string> {
        return this.jwtService.sign(payload);
    }

    async login(loginDto: {email, password}) : Promise<{ accessToken: string }> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,

        }
        const token = await this.generateToken(payload);
        if (!token) {
            throw new UnauthorizedException('Failed to generate token');
        }

        return { accessToken: token };
        
    }

    async register(userDto : CreateUserDto){
        const user = await this.userService.createUser(userDto);
        return user;
    }

    async getMe(userId: string) {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }
}
