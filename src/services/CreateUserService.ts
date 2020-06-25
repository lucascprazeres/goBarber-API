import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const findUserByEmail = await userRepository.findOne({
      where: { email },
    });

    if (findUserByEmail) {
      throw new Error('This email is already registered');
    }

    const hashedPassword = await hash(password, 8);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
