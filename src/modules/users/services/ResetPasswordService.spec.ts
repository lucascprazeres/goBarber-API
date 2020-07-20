// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRespository from '../repositories/fakes/FakeUserTokensRepository';

import ResetPasswordService from './ResetPasswordService';

let usersRepository: FakeUsersRepository;
let userTokensRepository: FakeUserTokensRespository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    userTokensRepository = new FakeUserTokensRespository();

    resetPassword = new ResetPasswordService(
      usersRepository,
      userTokensRepository,
    );
  });

  it('should be able to reset the psasword', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const { token } = await userTokensRepository.generate(user.id);

    await resetPassword.execute({
      token,
      password: '123123',
    });

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
