export {}

declare global {
  namespace Express {
    export interface Request {
      jwtPayload?: any;
    }
  }
}