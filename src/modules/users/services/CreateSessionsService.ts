import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import AuthConfig from '@config/auth';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Partial<User>;
  token: string;
}

class CreateSessionService {
  private removePasswordFromObjecUser(user: User): Partial<User> {
    const { created_at, email, id, name, avatar, updated_at } = user;

    return { email, created_at, id, name, avatar, updated_at };
  }

  private generateToken(user: User): string {
    const { email, id, name } = user;

    const payload = {
      id,
      name,
      email,
    };

    return sign(payload, AuthConfig.jwt.secret, {
      subject: id,
      expiresIn: AuthConfig.jwt.expiresIn,
    });
  }

  public async execute(data: IRequest): Promise<IResponse> {
    const { email, password } = data;
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email or password combination.', 401);
    }

    return {
      user: this.removePasswordFromObjecUser(user),
      token: this.generateToken(user),
    };
  }
}

export default CreateSessionService;
