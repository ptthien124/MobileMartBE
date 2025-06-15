import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.ENV === 'local' ? 'http://localhost:3000' : 'https://mobile-mart.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });

  await app.listen(process.env.PORT ?? 3333);
}

void bootstrap();
