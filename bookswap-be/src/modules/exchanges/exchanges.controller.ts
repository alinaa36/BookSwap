import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth/guard/auth.guard';
import { CreateExchangeDTO } from './dto/create-exchange.dto';
import { ExchangesService } from './exchanges.service';

@Controller('exchange')
export class ExchangesController {
  constructor(private exchangeService: ExchangesService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() exchangeDTO: CreateExchangeDTO, @Request() req) {
    const userId = req.user.sub;
    console.log(req.user);
    console.log(exchangeDTO);
    return this.exchangeService.create(exchangeDTO, userId);
  }
}
