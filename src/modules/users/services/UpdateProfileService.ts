import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute(data: IRequest): Promise<User> {
    const { user_id, name, email, password, old_password } = data;

    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (
      email &&
      email !== user.email &&
      (await usersRepository.findByEmail(email))
    ) {
      throw new AppError('There is already one user with this email.');
    }

    user.email = email;

    if (password) {
      if (old_password) {
        const checkOldPassword = await compare(old_password, user.password);

        if (!checkOldPassword) {
          throw new AppError('Old password does not match.');
        }

        user.password = await hash(password, 8);
      } else {
        throw new AppError('Old password is required.');
      }
    }

    if (name) {
      user.name = name;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
