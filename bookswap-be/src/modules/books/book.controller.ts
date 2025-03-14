import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BookService } from './books.servise';
import { CreateBookDTO } from './dto/create-books.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateBookDTO } from './dto/update-books.dto';
import { AuthGuard } from '../auth/auth/guard/auth.guard';
import { QueryBooksDTO } from './dto/query-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookServise: BookService) {}

  @Get()
  async getQuery(@Query() queryBooksDTO: QueryBooksDTO) {
    return await this.bookServise.findAll(queryBooksDTO);
  }

  @Get()
  async getAll() {
    return await this.bookServise.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.bookServise.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
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
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(req.user);
    console.log(book);
    const userId = req.user.sub;

    return await this.bookServise.create(book, file ? file.path : null, userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
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
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user.sub;
    return await this.bookServise.update(
      id,
      book,
      file ? file.path : null,
      userId,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.bookServise.delete(id);
  }
}
