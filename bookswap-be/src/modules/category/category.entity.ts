import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Books } from '../books/books.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Books, (book) => book.categories)
  books: Books[];
}
