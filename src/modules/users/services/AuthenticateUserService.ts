import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/iUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const foundUser = await this.usersRepository.findByEmail(email);

    if (!foundUser) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, foundUser.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: foundUser.id,
      expiresIn,
    });

    return {
      user: foundUser,
      token,
    };
  }
}

export default AuthenticateUserService;
