import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Books } from '../books/books.entity';
import { Users } from '../users/users.entity';
import { statusExchange } from './status-exchange.enum';

@Entity()
export class Exchanges {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Books)
  @JoinColumn({ name: 'offeredBook' })
  offeredBook: Books;

  @ManyToOne(() => Books)
  @JoinColumn({ name: 'requestedBook' })
  requestBook: Books;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'offeringUser' })
  offeringUser: Users;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'requestingUser' })
  requestingUser: Users;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: statusExchange,
    default: statusExchange.PENDING,
  })
  status: statusExchange;

  @UpdateDateColumn({ nullable: true })
  completedAt: Date;
}
