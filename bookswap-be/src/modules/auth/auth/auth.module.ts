import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/users/user.module';
import { User } from 'src/modules/users/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/app-config.module';
import { JwtConfigModule } from 'src/config/jwt-config.module';

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
