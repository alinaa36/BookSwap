import { BaseEntity } from '../../../modules/common/entity';
import { Book } from '../../../modules/books/entity/books.entity';
import { User } from '../../../modules/users/entity/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('book_reviews324')
export class ReviewBook extends BaseEntity {
  @ManyToOne(() => User, (user) => user.reviews)
  reviewer: User;

  @ManyToOne(() => Book, (book) => book.reviews)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column({ type: 'int' })
  rating: number;

  @Column('text')
  commentText: string;
}
