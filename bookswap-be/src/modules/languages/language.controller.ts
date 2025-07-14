import { Controller, Get } from '@nestjs/common';
import { Languageservice } from './language.service';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageServise: Languageservice) {}

  @Get()
  async findAll() {
    return await this.languageServise.getAll();
  }
}
