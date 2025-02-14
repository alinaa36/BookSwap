import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Books } from '../books/books.entity';
import { Exchanges } from '../exchanges/exchanges.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'bytea', nullable: true })
  photo: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  desire: string;

  @OneToMany(() => Books, (book) => book.owner)
  books: Books[];

  @OneToMany(() => Exchanges, (exchange) => exchange.offeringUser)
  exchanges1: Exchanges[];

  @OneToMany(() => Exchanges, (exchange) => exchange.requestingUser)
  exchanges2: Exchanges[];
}
