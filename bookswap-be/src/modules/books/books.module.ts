import { Module } from '@nestjs/common';
import { BooksController } from './book.controller';
import { BookService } from './books.servise';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './books.entity';
import { BooksRepository } from './books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  controllers: [BooksController],
  providers: [BookService, BooksRepository],
  exports: [BookService],
})
export class BooksModule {}
