import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import FakeStorageProvider from '@shared/providers/StorageProvider/mock/FakeStorageProvider';

import UpdateUserAvatarService from '@domain/users/services/UpdateUserAvatarService';

describe('CreateUser', () => {
  it('should be able to update user avatar', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeRepository,
      fakeStorageProvider,
    );

    const user = await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test test',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.jpg',
    });

    expect(user.user_avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non exist user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-exist-user',
        filename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@test.com',
      password: '1234test',
      verification_code: '123456',
      user_type_id: '3',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'oldAvatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'newAvatar.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('oldAvatar.jpg');
    expect(user.user_avatar).toBe('newAvatar.jpg');
  });
});
