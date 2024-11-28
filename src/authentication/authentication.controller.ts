import { Body, Controller, Post, Logger } from '@nestjs/common';
import { CreateAccountDTO, LoginDTO } from './authDTOs';
import { AuthenticationService } from './authentication.service';

@Controller('api/auth/v1')
export class AuthenticationController {

    private logger = new Logger(AuthenticationController.name);

    constructor(private service: AuthenticationService) {}

    @Post('signup')
    async SignUp(@Body() body: CreateAccountDTO) {

        this.logger.log('Sign Up Request');

        const result = await this.service.SignUp(body);

        return {statusCode: 201, data: result, message: 'OK' };
    }

    @Post('login')
    async Login(@Body() body: LoginDTO) {

        this.logger.log('Login Request');

        const result = await this.service.Login(body);

        return { statusCode: 200, data: result, message: 'OK' };
    }
}
