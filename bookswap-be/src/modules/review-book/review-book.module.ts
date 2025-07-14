import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '../books/books.module';
import { ReviewBook } from './entity/review-book.entity';
import { ReviewBookController } from './review-book.controller';
import { ReviewBookServise } from './review-book.servise';
import { ReviewBookRepository } from './review-book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewBook]), BooksModule],
  controllers: [ReviewBookController],
  providers: [ReviewBookServise, ReviewBookRepository],
  exports: [ReviewBookServise],
})
export class ReviewBookModule {}
