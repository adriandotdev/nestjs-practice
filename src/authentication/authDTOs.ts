export interface CreateAccountDTO {
    given_name: string;
    last_name: string;
    date_of_birth: string;
    username: string;
    password: string;
    date_created: string;
    date_modified: string;
}

export interface LoginDTO {
    username: string,
    password: string
}

export interface UserDTO {
    username: string,
    password: string
}