import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-users.dto';
import { AuthGuard } from '../auth/auth/guard/auth.guard';
import { UpdateUserDTO } from './dto/update-user.dto';
import { QueryUSerDTO } from './dto/query-users.dto';

@Controller('users')
export class UserController {
  constructor(private userServise: UserService) {}

  @Get()
  async getAll(@Query() query: QueryUSerDTO) {
    return await this.userServise.getAll(query);
  }

  @Post()
  async create(@Body() createUser: CreateUserDTO) {
    return this.userServise.create(createUser);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async update(@Body() user: UpdateUserDTO, @Request() req) {
    const userId = req.user.sub;
    return await this.userServise.update(userId, user);
  }
}
