import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Enable CORS for Angular frontend
  app.enableCors({
    origin: 'http://localhost:4200', // allow Angular
    credentials: true, // if using cookies or auth headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
