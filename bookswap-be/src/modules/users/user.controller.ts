import {
  Body,
  Controller,
  Patch,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth/guard/auth.guard';
import { UpdateUserDTO } from './dto/update-user.dto';
import { QueryUSerDTO } from './dto/query-users.dto';

@Controller('users')
export class UserController {
  constructor(private userServise: UserService) {}

  @Get()
  async getAll() {
    return await this.userServise.getAll();
  }

  @Get()
  async getQuery(@Query() query: QueryUSerDTO) {
    return await this.userServise.getQuery(query);
  }

  @Get(':id/exchanges')
  async getExchanges(@Param('id') id: number) {
    return await this.userServise.findExchange(id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  async update(@Body() user: UpdateUserDTO, @Request() req: any) {
    const userId = req.user.sub;
    return await this.userServise.update(userId, user);
  }

  @Delete()
  async remove(@Param() id: number) {
    return this.userServise.remove(id);
  }
}
