import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
	provide: CLOUDINARY,
	useFactory: async (configService: ConfigService) => {
		return v2.config({
			cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
			api_key: configService.get('CLOUDINARY_API_KEY'),
			api_secret: configService.get('CLOUDINARY_API_SECRET'),
			secure: process.env.NODE_ENV === 'production'
		});
	},
	inject: [ConfigService]
};
