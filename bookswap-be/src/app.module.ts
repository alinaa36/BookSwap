import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './modules/books/books.module';
import { AppConfigModule } from './config/app-config/app-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExchangesModule } from './modules/exchanges/exchanges.module';
import { ReviewBookModule } from './modules/review-book/review-book.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LanguageModule } from './modules/languages/language.module';
import { GenreModule } from './modules/genres/genre.module';

@Module({
  imports: [
    DatabaseModule,
    BooksModule,
    AppConfigModule,
    AuthModule,
    ExchangesModule,
    ReviewBookModule,
    LanguageModule,
    GenreModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/public',
      exclude: ['/api*'],
      serveStaticOptions: { index: false, redirect: false },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
