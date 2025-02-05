import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Category } from '../../category/category.entity';
import { Genres } from '../../genres/genres.entity';
import { Language } from '../../languages/langueges.entity';
import { Users } from '../../users/users.entity';
import { BookCondition } from '../book-condition.enum';

export class UpdateBookDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  deskription: string;

  @IsEnum(BookCondition)
  @IsOptional()
  condition: BookCondition;

  @IsString()
  @IsOptional()
  coverImage: string;

  @IsBoolean()
  @IsOptional()
  availability: boolean;

  @IsString()
  @IsOptional()
  categories: Category[];

  @IsString()
  @IsOptional()
  genre: Genres;

  @IsString()
  @IsOptional()
  language: Language;

  @IsString()
  @IsOptional()
  owner: Users;
}
