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

  @IsOptional()
  coverImage: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  availability: boolean;

  @IsOptional()
  @IsArray()
  @Type(() => Category)
  categories: Category[];

  @IsOptional()
  @Type(() => Genres)
  genre: Genres;

  @IsOptional()
  @Type(() => Language)
  language: Language;

  @IsOptional()
  @Type(() => User)
  owner: User;
}
