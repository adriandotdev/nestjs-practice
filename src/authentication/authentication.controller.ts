import { Body, Controller, Post, Logger } from '@nestjs/common';
import { CreateAccountDTO, LoginDTO } from './authDTOs';
import { AuthenticationService } from './authentication.service';

@Controller('api/auth/v1')
export class AuthenticationController {

    private logger = new Logger(AuthenticationController.name);

    constructor(private service: AuthenticationService) {}

    @Post('signup')
    SignUp(@Body() body: CreateAccountDTO) {

        this.logger.log('Sign Up Request');



        return { message: 'Login successful' };
    }

    @Post('login')
    Login(@Body() body: LoginDTO) {

        this.logger.log({ message: 'Login successful', body });

        return { message: 'Login successful' };
    }
}
