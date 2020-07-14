import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new FakeUsersRespository();
    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create users with same email', async () => {
    const usersRepository = new FakeUsersRespository();
    const createUser = new CreateUserService(usersRepository);

    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    await createUser.execute(userData);

    expect(createUser.execute(userData)).rejects.toBeInstanceOf(AppError);
  });
});
