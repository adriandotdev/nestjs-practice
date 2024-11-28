import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/authentication/authentication.guard';

@Controller('api/v1/users')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private service: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async GetAllUsers(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    this.logger.log('Get All Users');

    const result = await this.service.GetAllUsers(limit, offset);

    return {
      statusCode: 200,
      data: result,
      message: 'OK',
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async GetUserById(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Get User by ID: ${id}`);

    const result = await this.service.GetUserById(id);

    return {
      statusCode: 200,
      data: result,
      message: 'OK',
    };
  }
}
