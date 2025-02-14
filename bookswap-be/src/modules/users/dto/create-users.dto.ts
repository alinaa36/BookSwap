import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
