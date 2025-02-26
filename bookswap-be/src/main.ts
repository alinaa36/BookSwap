import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';
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
  const appConfigService = app.get<AppConfigService>(AppConfigService);
  const port = appConfigService.get<number>('PORT');
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();
