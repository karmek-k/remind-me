import { Request, Response } from 'express';
import { AuthChecker } from 'type-graphql';
import { User } from '../models/User';
import { authService } from '../services/auth';

export const jwtAuthContext = async (req: Request, res: Response) => {
  const header = req.headers.authorization || '';
  const token = header.split(' ')[1];

  const payload = authService.verifyJwt(token);
  if (!payload) {
    return { user: null };
  }

  return { user: await User.findOne(payload.id) };
};

export const jwtAuthChecker: AuthChecker = async data => {
  // TODO: implement
  return true;
};
