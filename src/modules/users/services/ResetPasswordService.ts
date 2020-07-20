import { isAfter, addHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/iUsersRepository';
import IUserTokensRepository from '../repositories/iUserTokensRepository';
import IHashProvider from '../providers/models/iHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const tokenCreationTimestamp = userToken.created_at;
    const tokenExpirantionLimit = addHours(tokenCreationTimestamp, 2);

    if (isAfter(Date.now(), tokenExpirantionLimit)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHashFrom(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
