import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async GetAllUsers(limit: number, offset: number) {
    const result = await this.repository.GetAllUsers(limit || 10, offset || 0);

    return result;
  }

  async GetUserById(id: number) {
    const result = await this.repository.GetUserById(id);

    if (!result) throw new NotFoundException('User not found');

    return result;
  }
}
