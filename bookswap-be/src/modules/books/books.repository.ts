import { Repository } from 'typeorm';
import { Books } from './books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDTO } from './dto/create-books.dto';
import { UpdateBookDTO } from './dto/update-books.dto';

export class BooksRepository extends Repository<Books> {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {
    super(
      booksRepository.target,
      booksRepository.manager,
      booksRepository.queryRunner,
    );
  }

  public async findAll(): Promise<Books[]> {
    return this.find();
  }

  public async store(book: CreateBookDTO): Promise<Books> {
    const newBook = this.create(book);
    return await this.save(newBook);
  }

  public async findById(id: number): Promise<Books> {
    return this.findOne({ where: { id } });
  }

  async updateById(
    id: number,
    bookDTO: UpdateBookDTO,
  ): Promise<Books | undefined> {
    const book = await this.findOne({ where: { id } });
    if (!book) return undefined;
    Object.assign(book, bookDTO);
    return this.save(book);
  }

  async destroy(id: number) {
    return this.delete(id);
  }
}
