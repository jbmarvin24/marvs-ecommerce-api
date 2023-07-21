import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthContoller } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { UserEmailNotExistConstraint } from './validations/user-email-not-exist.constraint';

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
    UserEmailNotExistConstraint,
  ],
  controllers: [AuthContoller],
})
export class AuthModule {}
