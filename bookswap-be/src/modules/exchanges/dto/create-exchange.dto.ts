import { IsNumber } from 'class-validator';

export class CreateExchangeDTO {
  @IsNumber()
  itemId: number;
}
