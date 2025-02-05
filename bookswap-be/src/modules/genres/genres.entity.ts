import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Books } from '../books/books.entity';

@Entity()
export class Genres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Books, (book) => book.genre)
  books: Books[];
}
