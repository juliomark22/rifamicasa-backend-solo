import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'https://rifamicasard.com',
    credentials: true,
  });
  await app.listen(4000, '0.0.0.0');
  console.log('🚀 Backend running on http://0.0.0.0:4000/api');
}
bootstrap();
