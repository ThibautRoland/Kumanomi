import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// class InitPool {
//   pool: Pool;

//   constructor() {
//     this.pool = this.initPool();
//   }

//   getPool(): Pool {
//     return this.pool
//   }

// }
export default function initPool(): Pool {
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

// module.exports = {
//     initPool
// }