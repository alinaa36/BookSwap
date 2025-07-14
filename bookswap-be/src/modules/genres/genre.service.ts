import { Injectable } from '@nestjs/common';
import { GenreRepository } from './genre.repository';

@Injectable()
export class GenreService {
  constructor(private readonly gehreRepository: GenreRepository) {}

  async getAll() {
    return await this.gehreRepository.findAll();
  }
}
