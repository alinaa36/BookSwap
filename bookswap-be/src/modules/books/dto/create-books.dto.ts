import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../../category/category.entity';
import { Genres } from '../../genres/genres.entity';
import { Language } from '../../languages/langueges.entity';
import { User } from '../../users/entity/users.entity';
import { BookCondition } from '../enums/book-condition.enum';
import { Transform, Type } from 'class-transformer';

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
  @Transform(({ value }) => value === 'true')
  availability: boolean;

  @IsArray()
  @Type(() => Category)
  categories: Category[];
  @Type(() => Genres)
  genre: Genres;
  @Type(() => Language)
  language: Language;
  @Type(() => User)
  owner: User;
}
