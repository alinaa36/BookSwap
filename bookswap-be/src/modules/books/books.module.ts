import { Module } from '@nestjs/common';
import { BooksController } from './book.controller';
import { BookService } from './books.servise';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/books.entity';
import { BooksRepository } from './books.repository';
import { UserModule } from '../users/user.module';
import { JwtConfigModule } from '../../config/jwt-config/jwt-config.module';
import { AppConfigModule } from '../../config/app-config/app-config.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    JwtConfigModule,
    UserModule,
    AppConfigModule,
    CategoryModule,
  ],
  controllers: [BooksController],
  providers: [BookService, BooksRepository],
  exports: [BookService, BooksRepository],
})
export class BooksModule {}
