import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/iUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/iCreateUserDTO';
import IFindAllProvidersDTO from '../../dtos/iFindAllProvidersDTO';

import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    excludedUserId,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (excludedUserId) {
      users = users.filter(user => user.id !== excludedUserId);
    }

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const selectedUserIndex = this.users.findIndex(
      currentUser => currentUser.id === user.id,
    );

    this.users[selectedUserIndex] = user;

    return user;
  }
}

export default UsersRepository;
