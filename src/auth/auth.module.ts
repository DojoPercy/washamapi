import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [ JwtModule.register({
    secret: process.env.JWT_SECRET || "defaultSecretKey",
  })],
  providers: [AuthService, UserService, AuthGuard],
  controllers: [AuthController],
  exports:[AuthGuard, JwtModule]
})
export class AuthModule {}
