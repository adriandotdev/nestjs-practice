import { Injectable } from "@nestjs/common";
import { CreateAccountDTO } from "./authDTOs";

@Injectable()
export class AuthenticationRepository {

    async SaveNewAccount(data: CreateAccountDTO) {

        return data;   
    }
} 