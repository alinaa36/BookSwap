import { Module } from '@nestjs/common';
import { BooksController } from './book.controller';
import { BookService } from './books.servise';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/books.entity';
import { BooksRepository } from './books.repository';
import { UserModule } from '../users/user.module';
import { JwtConfigModule } from 'src/config/jwt-config.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), JwtConfigModule, UserModule],
  controllers: [BooksController],
  providers: [BookService, BooksRepository],
  exports: [BookService],
})
export class BooksModule {}
