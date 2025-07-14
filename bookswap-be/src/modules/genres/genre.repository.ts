import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../common/repository';
import { Genres } from './genres.entity';
import { Repository } from 'typeorm';

export class GenreRepository extends BaseRepository<Genres> {
  constructor(
    @InjectRepository(Genres) private genreRepository: Repository<Genres>,
  ) {
    super(genreRepository);
  }
}
