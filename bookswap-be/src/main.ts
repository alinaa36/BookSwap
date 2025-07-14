import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config/app-config.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(errors);
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3001', // дозволити доступ тільки з цього домену
    methods: 'GET, POST, PUT, DELETE', // дозволити ці методи
    allowedHeaders: 'Content-Type, Authorization', // дозволити ці заголовки
  });

  const appConfigService = app.get<AppConfigService>(AppConfigService);
  const port = appConfigService.get<number>('PORT');
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();
