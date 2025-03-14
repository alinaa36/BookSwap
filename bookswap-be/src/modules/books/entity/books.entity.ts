import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BookCondition } from '../enums/book-condition.enum';
import { Genres } from '../../genres/genres.entity';
import { Language } from '../../languages/langueges.entity';
import { User } from '../../users/entity/users.entity';
import { Category } from '../../category/category.entity';
import { BaseEntity } from 'src/modules/base/bese-entity';

@Entity({ name: 'books' })
export class Book extends BaseEntity {
  // change

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: true })
  deskription: string;

  @Column({ type: 'enum', enum: BookCondition, default: BookCondition.NEW })
  condition: BookCondition;

  @Column({ name: 'cover_image', type: 'bytea', nullable: true })
  coverImage: string;

  @Column({ type: 'boolean', default: true })
  availability: boolean;

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => Genres, (genre) => genre.books)
  genre: Genres;

  @ManyToOne(() => Language, (language) => language.books)
  language: Language;

  @ManyToOne(() => User, (users) => users.books)
  owner: User;
}
