import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewBookRepository } from './review-book.repository';
import { createBookReviewDto } from './dto/create-book-review.dto';
import { BooksRepository } from '../books/books.repository';
import { ReviewBook } from './entity/review-book.entity';
import { Book } from '../books/entity/books.entity';
import { User } from '../users/entity/users.entity';

@Injectable()
export class ReviewBookServise {
  constructor(
    private reviewBookRepository: ReviewBookRepository,
    private bookRepository: BooksRepository,
  ) {}

  async createReview(review: createBookReviewDto) {
    return await this.reviewBookRepository.manager.transaction(
      async (manager) => {
        const book = await manager.findOne(Book, {
          where: { id: review.bookId },
        });

        const user = await manager.findOne(User, {
          where: { id: review.userId },
        });

        if (!book || !user) {
          throw new NotFoundException('Not found book');
        }

        const newReview = manager.create(ReviewBook, {
          ...review,
          book: book,
          reviewer: user,
        });

        await manager.save(ReviewBook, newReview);

        const reviewStats = await manager
          .createQueryBuilder()
          .select('COUNT(*)', 'count')
          .addSelect('AVG(rating)', 'average')
          .from(ReviewBook, 'review')
          .where('review.bookId = :bookId', { bookId: review.bookId })
          .getRawOne();

        book.reviewCount = reviewStats.count;
        book.averageRating = reviewStats.average;

        await this.bookRepository.updateEntity(review.bookId, book);
        return newReview;
      },
    );
  }
}
