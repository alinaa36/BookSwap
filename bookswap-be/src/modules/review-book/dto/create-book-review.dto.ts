import { IsNumber, IsString } from 'class-validator';

export class createBookReviewDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  bookId: number;

  @IsNumber()
  rating: number;

  @IsString()
  commentText: string;
}
