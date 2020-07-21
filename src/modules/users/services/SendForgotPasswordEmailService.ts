import { injectable, inject } from 'tsyringe';

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

    try {
      await this.mailProvider.sendMail({
        to: {
          name: foundUser.name,
          email: foundUser.email,
        },
        subject: '[GoBarber] Recuperação de senha',
        templateData: {
          template: 'Olá, {{name}} {{token}}',
          variables: {
            name: foundUser.name,
            token,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default SendForgotPasswordEmailService;