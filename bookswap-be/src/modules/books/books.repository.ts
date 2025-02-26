import { Repository } from 'typeorm';
import { Book } from './entity/books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/modules/base/repository';
import { QueryBooksDTO } from './dto/query-book.dto';

export class BooksRepository extends BaseRepository<Book> {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {
    super(booksRepository);
  }

  public async findQuery(query: QueryBooksDTO) {
    const whereOptions = Object.assign(
      {},
      query.title && { title: query.title },
      query.author && { author: query.author },
      query.condition && { condition: query.condition },
      query.availability && { availability: query.availability },
      query.categoriesId && { categories: { id: query.categoriesId } },
      query.genreId && { genre: { id: query.genreId } },
      query.languageId && { language: { id: query.languageId } },
      query.ownerId && { owner: { id: query.ownerId } },
    );

    return await this.find({ where: whereOptions });
  }
}
