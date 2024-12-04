import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthenticationRepository } from './authentication.repository';
import { CreateAccountDTO, LoginDTO } from './authDTOs';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private repository: AuthenticationRepository,
    private jwtService: JwtService,
  ) {}

  async SignUp(data: CreateAccountDTO) {
    const hashedPassword = await bcryptjs.hash(data.password, 10);

    const user = await this.repository.SaveUser({
      ...data,
      password: hashedPassword,
    });

    await this.repository.SaveUserDetail(data, user.insertId);

    return {
      id: user.insertId,
      given_name: data.given_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      username: data.username,
    };
  }

  async Login(data: LoginDTO) {
    const user = await this.repository.FindOneByUsername(data.username);

    if (!user) {
      throw new BadRequestException('Bad Request', {
        cause: 'User not found',
        description: 'User not found',
      });
    }

    const isMatch = await bcryptjs.compare(data.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Bad Request', {
        cause: 'Password mismatch',
        description: 'Password mismatch',
      });
    }

    const access_token = await this.jwtService.signAsync({
      sub: user.username,
      username: user.username,
    });

    return {
      access_token,
    };
  }
}
