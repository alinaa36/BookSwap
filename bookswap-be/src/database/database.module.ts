import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../modules/users/entity/users.entity';
import { Book } from '../modules/books/entity/books.entity';
import { Exchanges } from '../modules/exchanges/entity/exchanges.entity';
import { Genres } from '../modules/genres/genres.entity';
import { Language } from '../modules/languages/langueges.entity';
import { Category } from '../modules/category/category.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Book, Exchanges, Genres, Language, Category],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
