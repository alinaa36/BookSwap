import { Module } from '@nestjs/common';
import { ExchangesItemRepository } from './txchanges-inem.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangesItem } from './exchanges-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExchangesItem])],
  providers: [ExchangesItemRepository],
  exports: [ExchangesItemRepository],
})
export class ExchangesItemModule {}
