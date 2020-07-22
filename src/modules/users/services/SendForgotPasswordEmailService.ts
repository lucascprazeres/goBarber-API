import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/iUsersRepository';
import IUserTokensRepository from '../repositories/iUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const foundUser = await this.usersRepository.findByEmail(email);

    if (!foundUser) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokensRepository.generate(foundUser.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    try {
      await this.mailProvider.sendMail({
        to: {
          name: foundUser.name,
          email: foundUser.email,
        },
        subject: '[GoBarber] Recuperação de senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: foundUser.name,
            link: `http://localhost:3000/reset?token=${token}`,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default SendForgotPasswordEmailService;
