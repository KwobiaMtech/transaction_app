import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import {JwtStrategy} from "./guards/jwt.strategy";

@Module({
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  exports: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '100000000s' },
      }),
    }),
  ],
})
export class AuthModule {}
