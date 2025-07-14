import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { statusExchange } from '../enum/status-exchange.enum';
import { BaseEntity } from '../../common/entity';
import { ExchangesItem } from '../../../modules/exchangesItem/exchanges-item.entity';

@Entity()
export class Exchanges extends BaseEntity {
  @ManyToOne(() => User, (user) => user.requestedExchanges)
  requester: User;

  @ManyToOne(() => User, (user) => user.receivedExchanges)
  receiver: User;

  @Column({
    type: 'enum',
    enum: statusExchange,
    default: statusExchange.PENDING,
  })
  status: statusExchange;

  @OneToMany(() => ExchangesItem, (exchangesItem) => exchangesItem.exchange, {
    cascade: true,
  })
  item: ExchangesItem[];
}
