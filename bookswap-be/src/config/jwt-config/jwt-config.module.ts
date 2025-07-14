import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from '../app-config/app-config.service';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  imports: [
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: appConfigService.get<string>('jwt.expiresIn'),
        },
      }),
      inject: [AppConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
