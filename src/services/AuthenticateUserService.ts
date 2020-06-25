import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
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

    delete foundUser.password;

    return {
      user: foundUser,
    };
  }
}

export default AuthenticateUserService;
