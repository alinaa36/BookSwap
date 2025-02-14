import { Module } from '@nestjs/common';
import { BooksController } from './book.controller';
import { BookService } from './books.servise';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './books.entity';
import { BooksRepository } from './books.repository';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/auth/constans/constans';

@Module({
  imports: [
    TypeOrmModule.forFeature([Books]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  controllers: [BooksController],
  providers: [BookService, BooksRepository],
  exports: [BookService],
})
export class BooksModule {}
