import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeHashprovider from '../providers/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let usersRepository: FakeUsersRespository;
let hashProvider: FakeHashprovider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRespository();
    hashProvider = new FakeHashprovider();
    createUser = new CreateUserService(usersRepository, hashProvider);
    authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const auth = await authenticateUser.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const nonRegisteredData = {
      email: 'johndoe@email.com',
      password: '123456',
    };

    await expect(
      authenticateUser.execute(nonRegisteredData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
