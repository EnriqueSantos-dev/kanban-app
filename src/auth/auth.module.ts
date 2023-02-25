import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { RefreshTokenService } from '@/refresh-token/refresh-token.service';
import { UsersModule } from '@/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, RtJwtStrategy } from './strategies';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    CloudinaryModule,
    JwtModule.register({})
  ],
  providers: [AuthService, RefreshTokenService, JwtStrategy, RtJwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
