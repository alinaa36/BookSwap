import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../common/repository';
import { ReviewBook } from './entity/review-book.entity';
import { BooksRepository } from '../books/books.repository';

export class ReviewBookRepository extends BaseRepository<ReviewBook> {
  constructor(
    @InjectRepository(ReviewBook)
    private reviewBookRepository: Repository<ReviewBook>,
    private bookRepository: BooksRepository,
  ) {
    super(reviewBookRepository);
  }
}
