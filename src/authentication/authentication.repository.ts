import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAccountDTO, UserDTO } from './authDTOs';
import pool from 'src/config/mysql';
import { QueryResult, ResultSetHeader } from 'mysql2';

@Injectable()
export class AuthenticationRepository {
  SaveUser(data: CreateAccountDTO): Promise<ResultSetHeader> {
    return new Promise((resolve, reject) => {
      const QUERY = `
                INSERT INTO users (username, password) VALUES (?,?)
            `;

      pool.query(
        QUERY,
        [data.username, data.password],
        (err, result: ResultSetHeader) => {
          if (err)
            reject(
              new InternalServerErrorException(err, { cause: err.message }),
            );

          resolve(result);
        },
      );
    });
  }

  SaveUserDetail(data: CreateAccountDTO, id: number) {
    return new Promise((resolve, reject) => {
      const QUERY = `
                INSERT INTO user_details (user_id, given_name, last_name, date_of_birth) VALUES (?,?,?,?)
            `;

      pool.query(
        QUERY,
        [id, data.given_name, data.last_name, data.date_of_birth],
        (err, result) => {
          if (err)
            reject(
              new InternalServerErrorException(err, { cause: err.message }),
            );

          resolve(result);
        },
      );
    });
  }

  FindOneByUsername(username: string): Promise<UserDTO> {
    return new Promise((resolve, reject) => {
      const QUERY = `
                SELECT * FROM users WHERE username =?
            `;

      pool.query(QUERY, [username], (err, result: QueryResult) => {
        if (err)
          reject(new InternalServerErrorException(err, { cause: err.message }));

        resolve(result[0]);
      });
    });
  }
}
