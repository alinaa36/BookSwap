import { Injectable } from '@nestjs/common';
import { LanguageRepository } from './language.repository';

@Injectable()
export class Languageservice {
  constructor(private readonly languageRepository: LanguageRepository) {}

  async getAll() {
    return await this.languageRepository.findAll();
  }
}
