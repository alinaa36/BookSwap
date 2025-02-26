import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { Exchanges } from './entity/exchanges.entity';
import { ExchangesController } from './exchanges.controller';
import { ExchangesService } from './exchanges.service';
import { ExchangesRepository } from './exchanges.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/auth/constans/constans';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exchanges]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    BooksModule,
  ],
  controllers: [ExchangesController],
  providers: [ExchangesService, ExchangesRepository],
  exports: [ExchangesService],
})
export class ExchangesModule {}
