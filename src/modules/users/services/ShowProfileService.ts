import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/iUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  userId: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<User> {
    const currentUser = await this.usersRepository.findById(userId);

    if (!currentUser) {
      throw new AppError('User not found.');
    }

    return currentUser;
  }
}

export default ShowProfileService;
