// filepath: c:\Users\Clever - Saul\Desktop\HandsOn\NEST_NEXT\nest-new\2\nestjs-app\src\main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const port = configService.get<number>('PORT') || 3000;

	setupSwagger(app);

	await app.listen(port);
}

bootstrap().catch((err) => {
	console.error('Error during bootstrap:', err);
});
