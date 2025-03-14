import { Entity, Column, OneToMany } from 'typeorm';
import { Book } from '../../books/entity/books.entity';
import { Exchanges } from '../../exchanges/entity/exchanges.entity';
import { BaseEntity } from '../../base/bese-entity';

@Entity('users')
export class User extends BaseEntity {
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

  @OneToMany(() => Book, (book) => book.owner)
  books?: Book[];

  @OneToMany(() => Exchanges, (exchange) => exchange.requester)
  requestedExchanges?: Exchanges[];

  @OneToMany(() => Exchanges, (exchange) => exchange.receiver)
  receivedExchanges?: Exchanges[];
}
