import { IsEnum, IsOptional } from 'class-validator';
import { BookCondition } from '../enums/book-condition.enum';

export class QueryBooksDTO {
  @IsOptional()
  title?: string;

  @IsOptional()
  author?: string;

  @IsOptional()
  @IsEnum(BookCondition)
  condition?: BookCondition;

  @IsOptional()
  availability?: boolean;

  @IsOptional()
  categoriesId?: number;

  @IsOptional()
  genreId?: number;

  @IsOptional()
  languageId?: number;

  @IsOptional()
  ownerId?: number;
}
