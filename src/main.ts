import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  
    const isValidUrl = (url: string): boolean => {
      const urlPattern = /^[a-zA-Z0-9-.:/]*$/;
      return urlPattern.test(url);
    };

    if (!isValidUrl(frontendUrl)) {
      throw new Error(`Invalid FRONTEND_URL: ${frontendUrl}`);
    }

    const corsOptions: CorsOptions = {
      origin: frontendUrl,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };

    app.enableCors(corsOptions);

    const port = process.env.PORT || 7000;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error during server initialization', error);
  }
}

bootstrap();
