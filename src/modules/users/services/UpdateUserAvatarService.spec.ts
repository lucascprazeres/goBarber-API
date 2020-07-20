import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new FakeUsersRespository();
    const storageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepository,
      storageProvider,
    );

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it("should not be able to update non existint user's avatar", async () => {
    const usersRepository = new FakeUsersRespository();
    const storageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepository,
      storageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar when uploading a new one', async () => {
    const usersRepository = new FakeUsersRespository();
    const storageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(storageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepository,
      storageProvider,
    );

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'old-avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'new-avatar.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('old-avatar.jpg');
  });
});
