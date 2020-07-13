import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/iUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const findUserByEmail = await this.usersRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError('This email is already registered');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
