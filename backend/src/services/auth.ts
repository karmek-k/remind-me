import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { User } from '../models/User';

class AuthService {
  async verifyPassword(user: User, plaintextPassword: string) {
    return await argon2.verify(user.password, plaintextPassword);
  }

  makeJwt(payload: object) {
    const { JWT_TOKEN } = process.env;
    if (!JWT_TOKEN) {
      throw new Error('JWT_TOKEN environment variable is not defined');
    }

    return jwt.sign(payload, process.env.JWT_TOKEN);
  }
}

export const authService = new AuthService();
