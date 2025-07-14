import { Repository } from 'typeorm';
import { BaseRepository } from '../common/repository';
import { Language } from './langueges.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class LanguageRepository extends BaseRepository<Language> {
  constructor(
    @InjectRepository(Language)
    languageRepository: Repository<Language>,
  ) {
    super(languageRepository);
  }
}
