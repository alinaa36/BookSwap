import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../common/repository';
import { Exchanges } from './entity/exchanges.entity';
import { Repository } from 'typeorm';

export class ExchangesRepository extends BaseRepository<Exchanges> {
  constructor(
    @InjectRepository(Exchanges)
    private exchangesRepository: Repository<Exchanges>,
  ) {
    super(exchangesRepository);
  }
}
