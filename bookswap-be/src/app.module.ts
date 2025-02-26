import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './modules/books/books.module';
import { AppConfigModule } from './config/app-config.module';
import { AuthModule } from './modules/auth/auth/auth.module';
import { ExchangesModule } from './modules/exchanges/exchanges.module';

@Module({
  imports: [
    DatabaseModule,
    BooksModule,
    AppConfigModule,
    AuthModule,
    ExchangesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
