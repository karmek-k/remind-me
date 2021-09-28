import { Request, Response } from 'express';
import { AuthChecker } from 'type-graphql';
import { User } from '../models/User';
import { authService } from '../services/auth';

interface ContextType {
  user: User | null;
}

interface ContextReqRes {
  req: Request;
  res: Response;
}

export const jwtAuthContext = async ({ req }: ContextReqRes) => {
  let token: string;
  try {
    const header = req.headers.authorization ?? '';
    token = header.split(' ')[1];
  } catch (err) {
    return { user: null };
  }

  const payload = authService.verifyJwt(token);
  if (!payload) {
    return { user: null };
  }

  const user = (await User.findOne(payload.id)) ?? null;
  return { user };
};

export const jwtAuthChecker: AuthChecker<ContextType> = async ({ context }) => {
  return context.user !== null;
};
