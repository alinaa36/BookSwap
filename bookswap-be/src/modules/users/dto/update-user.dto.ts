import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  photo: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  rating: number;

  @IsOptional()
  desire: string;
}
