import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let usersRepository: FakeUsersRespository;
let showProfile: ShowProfileService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRespository();
    showProfile = new ShowProfileService(usersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      userId: user.id,
    });

    expect(profile?.name).toBe('John Doe');
    expect(profile?.email).toBe('johndoe@email.com');
  });

  it('should not be able to show profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
