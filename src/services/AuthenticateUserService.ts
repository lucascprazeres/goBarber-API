import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const foundUser = await userRepository.findOne({
      where: { email },
    });

    if (!foundUser) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, foundUser.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
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
