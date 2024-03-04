/*const Pool = require('pg').Pool
require('dotenv').config()

const pool = initPool()

function login(email: string, password: string) {
    const query: string = "SELECT * FROM users;"
    let promise = new Promise(function(resolve, reject) {
       const res = pool.query(query)
       console.log(res)
    //    resolve(res.result)
    })
}


function initPool(){
    const user = process.env.POSTGRES_USER || "thibaut"
    const host = process.env.POSTGRES_HOST || "localhost"
    const database=  process.env.POSTGRES_DB || "kumanomi"
    const password= process.env.POSTGRES_PWD || "password"
    const port= process.env.POSTGRES_PORT || 5432

    return new Pool({
        user: user ,
        host: host,
        database: database,
        password: password,
        port: port,
    })
}*/
import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class SessionRepository {
  private pool: Pool;

  constructor() {
    this.pool = this.initPool();
  }

  //https://www.postgresql.org/docs/current/pgcrypto.html#PGCRYPTO-PGP-ENC-FUNCS-PGP-SYM-ENCRYPT
  // pgp_sym_decrypt_bytea(msg bytea, psw text [, options text ]) returns bytea
  login(email: string, password: string): Promise<QueryResult> {
    const query: string = `SELECT
                CASE
                    WHEN EXISTS (
                        SELECT pgp_sym_decrypt(password::bytea, 'kumanomi_secret_key')
                        FROM users
                        WHERE pgp_sym_decrypt(password::bytea, 'kumanomi_secret_key') = ($1) AND email  = ($2)
                        )
                    THEN 'TRUE'
                    ELSE 'FALSE'
                END;`;

            
          
    const values = [password, email]

    const query2 = {
      text: query,
      values: values
  };

    return new Promise((resolve, reject) => {
      this.pool.query(query2, (error: Error, result: QueryResult) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /*login(email: string, password: string): Promise<QueryResult> {
    const query: string = "SELECT * FROM users;";
    return new Promise(function(resolve, reject) {
      const res = this.pool.query(query, (error: Error, result: QueryResult) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
      console.log(res);
    });
  }*/

  private initPool(): Pool {
    const user = process.env.POSTGRES_USER || "thibaut";
    const host = process.env.POSTGRES_HOST || "localhost";
    const database = process.env.POSTGRES_DB || "kumanomi";
    const password = process.env.POSTGRES_PWD || "password";
    const port = process.env.POSTGRES_PORT || 5432;

    return new Pool({
      user: user,
      host: host,
      database: database,
      password: password,
      port: port as number
    });
  }
}

export default new SessionRepository();