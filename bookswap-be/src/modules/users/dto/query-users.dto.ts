import { IsOptional } from 'class-validator';

export class QueryUSerDTO {
  @IsOptional()
  name?: string;

  @IsOptional()
  lastname?: string;
}
