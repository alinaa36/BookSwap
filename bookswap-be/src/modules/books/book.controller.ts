import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './books.servise';
import { CreateBookDTO } from './dto/create-books.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateBookDTO } from './dto/update-books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookServise: BookService) {}

  @Get()
  async getAll() {
    return await this.bookServise.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.bookServise.findById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async create(
    @Body() book: CreateBookDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File not uploaded');
    }

    return await this.bookServise.create(book, file.path);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async updateById(
    @Param('id') id: number,
    @Body() book: UpdateBookDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.bookServise.update(id, book, file ? file.path : null);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.bookServise.delete(id);
  }
}
