import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/iUsersRepository';
import IHashProvider from '../providers/models/iHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const currentUser = await this.usersRepository.findById(userId);

    if (!currentUser) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== currentUser.id) {
      throw new AppError('E-mail already in use.');
    }

    currentUser.name = name;
    currentUser.email = email;

    if (password && !old_password) {
      throw new AppError(
        'The old password must be provided in order to set a new one.',
      );
    }

    if (password && old_password) {
      const oldPaswordIsCorrect = await this.hashProvider.assertEquals(
        old_password,
        currentUser.password,
      );

      if (!oldPaswordIsCorrect) {
        throw new AppError('Old password does not match.');
      }

      currentUser.password = await this.hashProvider.generateHashFrom(password);
    }

    return this.usersRepository.save(currentUser);
  }
}

export default UpdateProfileService;
