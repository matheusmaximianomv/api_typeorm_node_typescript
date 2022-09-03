import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import auth from '@config/auth';

interface ITokenPayload {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, auth.jwt.secret) as ITokenPayload;

    const { id, name, email } = decoded;

    request.user = {
      id,
      name,
      email,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token');
  }
}
