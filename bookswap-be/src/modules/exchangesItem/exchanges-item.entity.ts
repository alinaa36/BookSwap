import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/entity';
import { Exchanges } from '../exchanges/entity/exchanges.entity';
import { Book } from '../books/entity/books.entity';

@Entity()
export class ExchangesItem extends BaseEntity {
  @ManyToOne(() => Exchanges, (exchange) => exchange.item, {
    onDelete: 'CASCADE',
  })
  exchange: Exchanges;

  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  book: Book;
}
