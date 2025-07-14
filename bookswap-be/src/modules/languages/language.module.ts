import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageController } from './language.controller';
import { Languageservice } from './language.service';
import { LanguageRepository } from './language.repository';
import { Language } from './langueges.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [Languageservice, LanguageRepository],
})
export class LanguageModule {}
