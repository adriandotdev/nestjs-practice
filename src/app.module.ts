import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthenticationModule, UserModule],
  controllers: [AppController, AuthenticationController, UserController],
  providers: [AppService],
})
export class AppModule {}
