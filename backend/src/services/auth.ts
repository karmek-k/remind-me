import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { User } from '../models/User';

export interface JwtPayload {
  id: number;
  username: string;
}

class AuthService {
  private secret: string;

  constructor() {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }

    this.secret = JWT_SECRET;
  }

  async verifyPassword(user: User, plaintextPassword: string) {
    return await argon2.verify(user.password, plaintextPassword);
  }

  makeJwt(payload: JwtPayload) {
    return jwt.sign(payload, this.secret);
  }

  verifyJwt(token: string) {
    let payload: JwtPayload;
    try {
      payload = jwt.verify(token, this.secret) as JwtPayload;
    } catch (err) {
      return null;
    }

    return payload;
  }
}

export const authService = new AuthService();
