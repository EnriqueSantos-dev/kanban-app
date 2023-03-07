import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './types';
import { AuthConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(
	Strategy,
	AuthConstants.AT_JWT_KEY
) {
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET')
		});
	}

	async validate(payload: JwtPayload) {
		return { id: payload.sub, email: payload.email };
	}
}
