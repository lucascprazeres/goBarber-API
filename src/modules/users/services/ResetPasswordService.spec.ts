import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRespository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';

let usersRepository: FakeUsersRepository;
let userTokensRepository: FakeUserTokensRespository;
let hashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    userTokensRepository = new FakeUserTokensRespository();
    hashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      usersRepository,
      userTokensRepository,
      hashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const { token } = await userTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(hashProvider, 'generateHashFrom');

    await resetPassword.execute({
      token,
      password: '123123',
    });

    const updatedUser = await usersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non-existing user', async () => {
    const { token } = await userTokensRepository.generate(
      'non-existing-user-id',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if the token was created more than 2 hours ago', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const { token } = await userTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
