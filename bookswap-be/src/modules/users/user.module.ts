import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { UserRepository } from './users.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { JwtConfigModule } from '../../config/jwt-config/jwt-config.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtConfigModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
