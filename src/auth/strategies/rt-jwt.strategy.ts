import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '@/users/users.service';
import { AuthConstants } from '../constants';
import { JwtPayload } from './types';

@Injectable()
export class RtJwtStrategy extends PassportStrategy(
	Strategy,
	AuthConstants.RT_JWT_KEY
) {
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
