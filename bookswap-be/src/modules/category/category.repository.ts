import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../common/repository';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectRepository(Category)
    private categoriRepository: Repository<Category>,
  ) {
    super(categoriRepository);
  }
}
