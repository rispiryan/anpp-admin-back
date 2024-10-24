import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { storageProvider } from '../providers/storage.p';

@Module({
  controllers: [AuthController],
  providers: [AuthService, storageProvider],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET || 'ACCESS_SECRET',
      signOptions: {
        expiresIn: '8h',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
