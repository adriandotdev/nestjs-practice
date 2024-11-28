import { Injectable } from '@nestjs/common';
import { AuthenticationRepository } from './authentication.repository';
import { CreateAccountDTO} from './authDTOs';

@Injectable()
export class AuthenticationService {

    constructor(private repository: AuthenticationRepository) {}

    SignUp(data: CreateAccountDTO) {

        return data;
    }
}
