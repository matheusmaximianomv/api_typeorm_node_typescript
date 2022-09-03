import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';

import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import path from 'path';

interface IRequest {
  email: string;
}

class ResetPasswordService {
  public async execute(data: IRequest): Promise<void> {
    const { email } = data;

    const usersRepository = getCustomRepository(UserRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await usersTokenRepository.generate(user.id);

    if (!token) {
      throw new AppError('Token not generated.', 500);
    }

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        email,
        name: user.name,
      },
      subject: `[API Vendas] Recuperação de Senha`,
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token.token}`,
        },
      },
    });
  }
}

export default ResetPasswordService;
