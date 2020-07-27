import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/iUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<User[]> {
    const users = this.usersRepository.findAllProviders({
      excludedUserId: userId,
    });

    return users;
  }
}

export default ListProvidersService;
