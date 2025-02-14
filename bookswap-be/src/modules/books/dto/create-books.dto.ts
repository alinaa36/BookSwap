import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Category } from '../../category/category.entity';
import { Genres } from '../../genres/genres.entity';
import { Language } from '../../languages/langueges.entity';
import { Users } from '../../users/users.entity';
import { BookCondition } from '../book-condition.enum';

export class CreateBookDTO {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  deskription: string;

  @IsEnum(BookCondition)
  condition: BookCondition;

  @IsString()
  @IsOptional()
  coverImage: string;

  @IsBoolean()
  availability: boolean;

  @IsString()
  categories: Category[];

  @IsString()
  genre: Genres;

  @IsString()
  language: Language;

  @IsString()
  owner: Users;
}
