import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookCondition } from './book-condition.enum';
import { Genres } from '../genres/genres.entity';
import { Language } from '../languages/langueges.entity';
import { Users } from '../users/users.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: true })
  deskription: string;

  @Column({ type: 'enum', enum: BookCondition, default: BookCondition.NEW })
  condition: BookCondition;

  @Column({ name: 'cover_image', type: 'bytea' })
  coverImage: string;

  @Column({ type: 'boolean', default: true })
  availability: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => Genres, (genre) => genre.books)
  genre: Genres;

  @ManyToOne(() => Language, (language) => language.books)
  language: Language;

  @ManyToOne(() => Users, (users) => users.books)
  owner: Users;
}
