import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';

import UpdateUserConfirmationCodeService from '@domain/users/services/UpdateUserConfirmationCodeService';

describe('User Confirmation code', () => {
  it('should be able to verified account', async () => {
    const fakeRepository = new FakeUsersRepository();

    const confirmationCode = new UpdateUserConfirmationCodeService(
      fakeRepository,
    );

    const user = await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test one',
      password: '@A4321test',
      verification_code: '123456',
    });

    await confirmationCode.execute({
      user_id: user.id,
      code: user.verification_code,
    });

    expect(user.verified_account).toBe(true);
  });

  it('should not be able to verified account', async () => {
    const fakeRepository = new FakeUsersRepository();

    const confirmationCode = new UpdateUserConfirmationCodeService(
      fakeRepository,
    );

    await expect(
      confirmationCode.execute({
        user_id: 'test',
        code: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able when account already verified', async () => {
    const fakeRepository = new FakeUsersRepository();

    const confirmationCode = new UpdateUserConfirmationCodeService(
      fakeRepository,
    );

    const user = await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test one',
      password: '@A4321test',
      verification_code: '123456',
    });

    user.verified_account = true;

    await expect(
      confirmationCode.execute({
        user_id: user.id,
        code: user.verification_code,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able when code is not correct', async () => {
    const fakeRepository = new FakeUsersRepository();

    const confirmationCode = new UpdateUserConfirmationCodeService(
      fakeRepository,
    );

    const user = await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test one',
      password: '@A4321test',
      verification_code: '123456',
    });

    await expect(
      confirmationCode.execute({
        user_id: user.id,
        code: 'test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
