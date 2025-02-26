import { statusExchange } from '../enum/status-exchange.enum';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateExchangeDTO {
  @IsNumber()
  offeredBookId: number;

  @IsNumber()
  requestBookId: number;
  @IsOptional()
  @IsNumber()
  offeringUser: number;
  @IsOptional()
  @IsNumber()
  requestingUser: number;
  @IsOptional()
  status: statusExchange;
}
