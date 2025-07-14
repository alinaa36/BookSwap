import { Body, Controller, Post } from '@nestjs/common';
import { ReviewBookServise } from './review-book.servise';
import { createBookReviewDto } from './dto/create-book-review.dto';

@Controller('reviewBook')
export class ReviewBookController {
  constructor(private reviewBookServise: ReviewBookServise) {}
  @Post()
  async create(@Body() review: createBookReviewDto) {
    console.log('REVIEW', review);
    return await this.reviewBookServise.createReview(review);
  }
}
