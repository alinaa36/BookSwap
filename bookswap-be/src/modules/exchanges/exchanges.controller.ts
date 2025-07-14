import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateExchangeDTO } from './dto/create-exchange.dto';

@Controller('exchange')
export class ExchangesController {
  constructor(private exchangeService: ExchangesService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() exchangeDTO: CreateExchangeDTO, @Request() req) {
    const userId = req.user.sub;
    console.log(req.user);
    console.log(exchangeDTO);
    return this.exchangeService.pendingExchange(exchangeDTO, userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body() exchangeDTO: CreateExchangeDTO,
    @Request() req,
  ) {
    const userId = req.user.sub;
    console.log(req.user);
    console.log(exchangeDTO);
    return this.exchangeService.completedexchange(exchangeDTO, userId, id);
  }
}
