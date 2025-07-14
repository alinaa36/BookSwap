import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../common/repository';
import { ExchangesItem } from './exchanges-item.entity';
import { Repository } from 'typeorm';

export class ExchangesItemRepository extends BaseRepository<ExchangesItem> {
  constructor(
    @InjectRepository(ExchangesItem)
    private readonly exchangesItemRepository: Repository<ExchangesItem>,
  ) {
    super(exchangesItemRepository);
  }
}
