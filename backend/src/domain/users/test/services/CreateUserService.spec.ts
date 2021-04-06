import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import FakeHashProvider from '@domain/users/providers/HashProvider/mock/FakeHashProvider';
import FakeGenerateCodeProvider from '@shared/providers/GenerateCodeProvider/mock/FakeGenerateCodeProvider';

import CreateUserService from '@domain/users/services/CreateUserService';
import FakeSendMailProvider from '@shared/providers/SendMailProvider/mock/FakeSendMailProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();
    const fakeGenerateCode = new FakeGenerateCodeProvider();
    const fakeSendMail = new FakeSendMailProvider();

    const createUser = new CreateUserService(
      fakeRepository,
      fakeHash,
      fakeGenerateCode,
      fakeSendMail,
    );

    const user = await createUser.execute({
      email: 'test@gmail.com',
      name: 'test test',
      password: '@A4321test',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();
    const fakeGenerateCode = new FakeGenerateCodeProvider();
    const fakeSendMail = new FakeSendMailProvider();

    const createUser = new CreateUserService(
      fakeRepository,
      fakeHash,
      fakeGenerateCode,
      fakeSendMail,
    );

    await createUser.execute({
      email: 'test@gmail.com',
      name: 'test one',
      password: '@A4321test',
    });

    await expect(
      createUser.execute({
        email: 'test@gmail.com',
        name: 'test two',
        password: '@A4321test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
