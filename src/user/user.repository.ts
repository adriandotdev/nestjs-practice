import { Injectable } from '@nestjs/common';
import { QueryResult } from 'mysql2';
import pool from 'src/config/mysql';
import { User } from './userDTO';

@Injectable()
export class UserRepository {
  GetAllUsers(limit: number, offset: number): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const QUERY = `
            SELECT
                u.id,
                u.username,
                ud.given_name,
                ud.last_name,
                ud.date_of_birth,
                ud.date_created,
                ud.date_modified
            FROM 
                users AS u
            INNER JOIN user_details AS ud ON u.id = ud.user_id
            LIMIT ? OFFSET ?
        `;

      pool.query(QUERY, [limit, offset], (err, result: QueryResult) => {
        if (err) reject(err);

        resolve(result as User[]);
      });
    });
  }

  GetUserById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      const QUERY = `
            SELECT
                u.id,
                u.username,
                ud.given_name,
                ud.last_name,
                ud.date_of_birth,
                ud.date_created,
                ud.date_modified
            FROM 
                users AS u
            INNER JOIN user_details AS ud ON u.id = ud.user_id
            WHERE u.id =?
        `;

      pool.query(QUERY, [id], (err, result: QueryResult) => {
        if (err) reject(err);

        resolve(result[0]);
      });
    });
  }
}
