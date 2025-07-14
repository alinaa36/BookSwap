import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(path.join(__dirname, '..', 'public', 'images'));
    return this.appService.getHello();
  }
}
