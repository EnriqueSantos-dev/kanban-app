import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ credentials: true, origin: 'http://localhost:5173' });
	const config = app.get(ConfigService);

	app.use(cookieParser());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	);
	app.setGlobalPrefix('api/v1');

	await app.listen(config.get('PORT'));
}

bootstrap();
