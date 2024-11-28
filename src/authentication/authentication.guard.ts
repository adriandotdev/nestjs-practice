import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    try {
      const token = request.headers.authorization?.split(' ')[1];

      if (!token) throw new UnauthorizedException();

      await this.jwtService.verifyAsync(token, { secret: 'secret-key' });

      return true;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        this.logger.error('Token expired');
        throw new UnauthorizedException('Token Expired');
      }

      if (err instanceof JsonWebTokenError) {
        this.logger.error('Invalid token');
        throw new UnauthorizedException('Invalid Token');
      }

      throw new UnauthorizedException();
    }
  }
}
