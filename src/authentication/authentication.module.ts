import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRepository } from './authentication.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule
      .register({
        global: true,
        secret: 'secret-key',
        signOptions: {expiresIn: '5m'}
  })],
  providers: [AuthenticationService, AuthenticationRepository],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
