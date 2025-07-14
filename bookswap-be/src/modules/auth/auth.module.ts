import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../../modules/users/user.module';
import { User } from '../../modules/users/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../../config/app-config/app-config.module';
import { JwtConfigModule } from '../../config/jwt-config/jwt-config.module';

@Module({
  imports: [
    UserModule,
    AppConfigModule,
    JwtConfigModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
