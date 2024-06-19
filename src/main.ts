import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const corsOptions: CorsOptions = {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',  
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'], 
    }

    app.enableCors(corsOptions);

    const port = process.env.PORT || 7000;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error during server initialization', error);
  }
}

bootstrap();
