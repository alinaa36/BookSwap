import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { Exchanges } from './entity/exchanges.entity';
import { ExchangesController } from './exchanges.controller';
import { ExchangesService } from './exchanges.service';
import { ExchangesRepository } from './exchanges.repository';
import { BooksModule } from '../books/books.module';
import { ExchangesItemModule } from '../exchangesItem/exchanges-item.module';
import { JwtConfigModule } from '../../config/jwt-config/jwt-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exchanges]),
    JwtConfigModule,
    UserModule,
    BooksModule,
    ExchangesItemModule,
  ],
  controllers: [ExchangesController],
  providers: [ExchangesService, ExchangesRepository],
  exports: [ExchangesService],
})
export class ExchangesModule {}
