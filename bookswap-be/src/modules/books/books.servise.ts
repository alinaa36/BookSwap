import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './entity/books.entity';
import { CreateBookDTO } from './dto/create-books.dto';
import { UpdateBookDTO } from './dto/update-books.dto';
import { UserService } from '../users/user.service';
import { QueryBooksDTO } from './dto/query-book.dto';
import { User } from '../users/entity/users.entity';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BooksRepository,
    private readonly userService: UserService,
  ) {}

  async findAll(queryBooksDTO: QueryBooksDTO): Promise<Book[]> {
    return await this.bookRepository.findQuery(queryBooksDTO);
  }

  async getAll(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }

  async create(
    book: CreateBookDTO,
    imagePath: string,
    userId: number,
  ): Promise<Book> {
    if (imagePath) {
      const imageBuffer =
        'http://localhost:3000/' + imagePath.replace(/\\/g, '/'); // separate to env and use via config service + init in constructor
      book.coverImage = imageBuffer;
    }
    const user = await this.userService.findById(userId);

    const createdBook = await this.bookRepository.createEntity({
      ...book,
      owner: user,
    });

    return createdBook;
  }

  async findById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async findOwner(id: number): Promise<User> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    const user = book.owner;
    return user;
  }

  async update(
    id: number,
    book: UpdateBookDTO,
    imagePath: string,
  ): Promise<Book> {
    await this.findById(id);
    if (imagePath) {
      const image = 'http://localhost:3000/' + imagePath.replace(/\\/g, '/');
      book.coverImage = image;
    }

    return await this.bookRepository.updateEntity(id, book);
  }

  async delete(id: number) {
    return await this.bookRepository.destroy(id);
  }
}
