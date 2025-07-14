import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genres } from './genres.entity';
import { GenreController } from './genre.controller';
import { GenreRepository } from './genre.repository';
import { GenreService } from './genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genres])],
  controllers: [GenreController],
  providers: [GenreService, GenreRepository],
})
export class GenreModule {}
