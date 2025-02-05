import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Books } from './books.entity';
import { CreateBookDTO } from './dto/create-books.dto';
import { UpdateBookDTO } from './dto/update-books.dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BooksRepository) {}

  async findAll(): Promise<Books[]> {
    return await this.bookRepository.findAll();
  }

  async create(book: CreateBookDTO, imagePath: string): Promise<Books> {
    const imageBuffer =
      'http://localhost:3000/' + imagePath.replace(/\\/g, '/');

    const createdBook = await this.bookRepository.store({
      ...book,
      coverImage: imageBuffer,
    });

    return createdBook;
  }

  async findById(id: number): Promise<Books> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(
    id: number,
    book: UpdateBookDTO,
    imagePath: string,
  ): Promise<Books> {
    await this.findById(id);
    if (imagePath) {
      const image = 'http://localhost:3000/' + imagePath.replace(/\\/g, '/');
      book.coverImage = image;
    }

    return await this.bookRepository.updateById(id, book);
  }

  async delete(id: number) {
    return await this.bookRepository.destroy(id);
  }
}
