import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        SECRET_KEY_JWT: jwt.Secret
        EXPIRE_JWT: jwt.Expire
        // add more environment variables and their types here
      }
    }
  }