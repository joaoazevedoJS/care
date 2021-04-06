import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import FakeHashProvider from '@domain/users/providers/HashProvider/mock/FakeHashProvider';
import FakeTokenProvider from '@domain/users/providers/TokenProviders/mock/FakeTokenProvider';

import AcessAccountService from '@domain/users/services/auth/AcessAccountService';

describe('AcessAccount', () => {
  it('should be able to authenticated user', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();
    const fakeToken = new FakeTokenProvider();

    const acessAccount = new AcessAccountService(
      fakeRepository,
      fakeToken,
      fakeHash,
    );

    await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test test',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    const authenticated = await acessAccount.execute({
      email: 'test@gmail.com',
      password: '@A4321test',
    });

    expect(authenticated).toHaveProperty('user');
    expect(authenticated).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();
    const fakeToken = new FakeTokenProvider();

    const acessAccount = new AcessAccountService(
      fakeRepository,
      fakeToken,
      fakeHash,
    );

    await expect(
      acessAccount.execute({
        email: 'test@gmail.com',
        password: '4321test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();
    const fakeToken = new FakeTokenProvider();

    const acessAccount = new AcessAccountService(
      fakeRepository,
      fakeToken,
      fakeHash,
    );

    await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test one',
      password: '4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    await expect(
      acessAccount.execute({
        email: 'test@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
