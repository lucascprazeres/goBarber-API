import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeHashprovider from '../providers/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new FakeUsersRespository();
    const hashProvider = new FakeHashprovider();

    const createUser = new CreateUserService(usersRepository, hashProvider);
    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );

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
    const usersRepository = new FakeUsersRespository();
    const hashProvider = new FakeHashprovider();

    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );

    const nonRegisteredData = {
      email: 'johndoe@email.com',
      password: '123456',
    };

    await expect(
      authenticateUser.execute(nonRegisteredData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new FakeUsersRespository();
    const hashProvider = new FakeHashprovider();

    const createUser = new CreateUserService(usersRepository, hashProvider);
    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );

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
