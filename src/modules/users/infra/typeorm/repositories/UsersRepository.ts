import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/iUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/iCreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/iFindAllProvidersDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    excludedUserId,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (excludedUserId) {
      users = await this.ormRepository.find({
        where: {
          id: Not(excludedUserId),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
