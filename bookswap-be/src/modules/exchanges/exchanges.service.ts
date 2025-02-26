import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { CreateExchangeDTO } from './dto/create-exchange.dto';
import { statusExchange } from './enum/status-exchange.enum';
import { ExchangesRepository } from './exchanges.repository';
import { BookService } from '../books/books.servise';

@Injectable()
export class ExchangesService {
  constructor(
    private readonly exchangesRepository: ExchangesRepository,
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  async create(exchangeDTO: CreateExchangeDTO, userId: number) {
    const offeredBook = await this.bookService.findById(
      exchangeDTO.offeredBookId,
    );
    const requestBook = await this.bookService.findById(
      exchangeDTO.requestBookId,
    );

    if (!offeredBook || !requestBook) {
      throw new Error('Одна або обидві книги не знайдені');
    }

    const offeringUser = await this.userService.findById(userId);
    const requestingUser = await this.bookService.findOwner(
      exchangeDTO.requestBookId,
    );

    console.log(offeringUser);
    console.log(requestBook);
    if (!offeringUser || !requestingUser) {
      throw new Error('Власники книг не знайдені');
    }
    const createExchange = await this.exchangesRepository.createEntity({
      offeredBook,
      requestBook,
      offeringUser,
      requestingUser,
      status: statusExchange.PENDING,
    });

    return createExchange;
  }
}
