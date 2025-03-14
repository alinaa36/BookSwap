import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { ExchangesRepository } from './exchanges.repository';
import { BookService } from '../books/books.servise';
import { CreateExchangeDTO } from './dto/create-exchange.dto';
import { statusExchange } from './enum/status-exchange.enum';
import { ExchangesItemRepository } from '../exchangesItem/txchanges-inem.repository';
import { Exchanges } from './entity/exchanges.entity';
import { Book } from '../books/entity/books.entity';
import { ExchangesItem } from '../exchangesItem/exchanges-item.entity';

@Injectable()
export class ExchangesService {
  logger: any;
  constructor(
    private readonly exchangesRepository: ExchangesRepository,
    private readonly exchangeItemRepository: ExchangesItemRepository,
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  async pendingExchange(body: CreateExchangeDTO, userId: number) {
    const requester = await this.userService.findById(userId);
    const receiver = await this.bookService.findOwner(body.itemId);
    const book = await this.bookService.findById(body.itemId);

    const exchange = await this.exchangesRepository.createEntity({
      receiver,
      requester,
      status: statusExchange.PENDING,
    });

    const exchangeItem = await this.exchangeItemRepository.createEntity({
      exchange,
      book,
    });

    return { exchange, exchangeItem };
  }

  async completedexchange(body: CreateExchangeDTO, userId: number, id: number) {
    return await this.exchangeItemRepository.manager.transaction(
      async (manager) => {
        const exchange = await manager.findOne(Exchanges, {
          where: { id },
          relations: [
            'item',
            'item.book',
            'requester',
            'receiver',
            'item.book.owner',
          ],
        });

        if (!exchange) {
          throw new NotFoundException(`Exchange with ${id} not found`);
        }

        if (userId !== exchange.receiver.id) {
          throw new ForbiddenException(
            'You do not have permission to complete this exchange',
          );
        }

        if (exchange.status != statusExchange.PENDING) {
          throw new BadRequestException('Exchange cannot be completed');
        }

        const book = await manager.findOne(Book, {
          where: { id: body.itemId },
          relations: ['owner'],
        });

        exchange.status = statusExchange.COMPLETED;

        try {
          exchange.item[0].book.owner = exchange.requester;
          book.owner = exchange.receiver;

          await manager.save([book, exchange.item[0].book]);

          const completed = await manager.save(Exchanges, exchange);
          await manager.save(ExchangesItem, {
            exchange,
            book,
          });
          return completed;
        } catch (error) {
          this.logger.error(
            'Failed to complete exchange: ${error.message}',
            error.stack,
          );

          throw new InternalServerErrorException('Failed to process exchange');
        }
      },
    );
  }
}
