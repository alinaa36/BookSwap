import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get<AppConfigService>(AppConfigService);
  const port = appConfigService.get<number>('PORT');
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();
