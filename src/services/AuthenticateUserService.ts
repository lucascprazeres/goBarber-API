import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

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
      throw Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, foundUser.password);

    if (!passwordMatched) {
      throw Error('Incorrect email/password combination');
    }

    const token = sign({}, '060d94c3dc6530af8dc56285010d5fd0', {
      subject: foundUser.id,
      expiresIn: '1d',
    });

    return {
      user: foundUser,
      token,
    };
  }
}

export default AuthenticateUserService;
