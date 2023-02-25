import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtPayload } from './types';
import { UsersService } from '@/users/users.service';

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RtJwtStrategy.ExtractJwt]),
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
      ignoreExpiration: true
    });
  }

  public async validate(req: Request, payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);

    if (!user) return null;

    if (payload.exp < Date.now() / 1000) {
      throw new ForbiddenException('Refresh token expired');
    }

    return {
      ...payload,
      refreshToken: RtJwtStrategy.ExtractJwt(req)
    };
  }

  static ExtractJwt(req: Request) {
    return req?.cookies?.refresh_token ?? null;
  }
}
