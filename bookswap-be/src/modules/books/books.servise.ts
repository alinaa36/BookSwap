import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './entity/books.entity';
import { CreateBookDTO } from './dto/create-books.dto';
import { UpdateBookDTO } from './dto/update-books.dto';
import { UserService } from '../users/user.service';
import { QueryBooksDTO } from './dto/query-book.dto';
import { User } from '../users/entity/users.entity';
import { AppConfigService } from '../../config/app-config/app-config.service';
import { EntityManager, In } from 'typeorm';
import { CategoryRepository } from '../category/category.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BooksRepository,
    private readonly userService: UserService,
    private readonly configServece: AppConfigService,
    private readonly categoryRepository: CategoryRepository,
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
    // Якщо є шлях до зображення, оновлюємо поле coverImage
    if (imagePath) {
      const imageBuffer =
        'http://localhost:3000/' + imagePath.replace(/\\/g, '/'); // може бути винесено в env і ініціалізовано через config service
      book.coverImage = imageBuffer;
    }

    // Знаходимо користувача за його ID
    const user = await this.userService.findById(userId);

    // Створюємо нову книгу з отриманими категоріями та власником
    const createdBook = await this.bookRepository.createEntity({
      ...book,
      owner: user,
    });

    console.groupCollapsed('LENGHT', book.categories.length);

    if (book.categories.length > 0) {
      const categories = await this.categoryRepository.find({
        where: { id: In(book.categories) },
      });

      // Assign categories to book
      createdBook.categories = categories;

      await this.bookRepository.createEntity(createdBook);

      return createdBook;
    }
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
    userId: number,
  ): Promise<Book> {
    await this.findById(id);
    const bookId = await this.bookRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (userId != bookId.owner.id) {
      throw new ForbiddenException('You cannot edit this book.');
    }
    if (imagePath) {
      const image = 'http://localhost:3000/' + imagePath.replace(/\\/g, '/');
      book.coverImage = image;
    }

    return await this.bookRepository.updateEntity(id, book);
  }

  async delete(id: number) {
    return await this.bookRepository.destroy(id);
  }
  async updateOwner(bookId: number, book: Book, manager: EntityManager) {
    await manager.update(Book, bookId, { owner: book.owner });
  }
}
