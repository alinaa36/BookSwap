import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Book } from '../../books/entity/books.entity';
import { User } from '../../users/entity/users.entity';
import { statusExchange } from '../enum/status-exchange.enum';
import { BaseEntity } from '../../base/bese-entity';

@Entity()
export class Exchanges extends BaseEntity {
  @ManyToOne(() => Book)
  @JoinColumn({ name: 'offeredBook' })
  offeredBook: Book;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'requestedBook' })
  requestBook: Book;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'offeringUser' })
  offeringUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requestingUser' })
  requestingUser: User;

  @Column({
    type: 'enum',
    enum: statusExchange,
    default: statusExchange.PENDING,
  })
  status: statusExchange;
}
