import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthContoller } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { UserEmailNotExistConstraint } from './validations/user-email-not-exist.constraint';
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      // TODO: Move to config file
      secret: 'jwtMySecret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
    UserEmailNotExistConstraint,
  ],
  controllers: [AuthContoller],
})
export class AuthModule {}
