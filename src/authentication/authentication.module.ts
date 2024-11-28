import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRepository } from './authentication.repository';

@Module({
  providers: [AuthenticationService, AuthenticationRepository],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
