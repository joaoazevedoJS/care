import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import FakeUsersTypeRepository from '@domain/users/mock/FakeUsersTypeRepository';

import UpdateUserConfirmationCodeService from '@domain/users/services/UpdateUserConfirmationCodeService';

describe('User Confirmation code', () => {
  it('should be able to verified account', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();

    const confirmationCode = new UpdateUserConfirmationCodeService(
      fakeRepository,
      fakeUserTypeRepository,
    );

    const user = await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test one',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    await confirmationCode.execute({
      user_id: user.id,
      code: user.verification_code,
    });

    expect(user.verified_account).toBe(true);
  });

  it('should not be able to verified account', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();

    const confirmationCode = new UpdateUserConfirmationCodeService(
      fakeRepository,
      fakeUserTypeRepository,
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
    const fakeUserTypeRepository = new FakeUsersTypeRepository();

    const confirmationCode = new UpdateUserConfirmationCodeService(
      fakeRepository,
      fakeUserTypeRepository,
    );

    const user = await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test one',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
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
    const fakeUserTypeRepository = new FakeUsersTypeRepository();

    const confirmationCode = new UpdateUserConfirmationCodeService(
      fakeRepository,
      fakeUserTypeRepository,
    );

    const user = await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test one',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    await expect(
      confirmationCode.execute({
        user_id: user.id,
        code: 'test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change user type when is mail of company', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();

    const confirmationCode = new UpdateUserConfirmationCodeService(
      fakeRepository,
      fakeUserTypeRepository,
    );

    const user = await fakeRepository.create({
      email: 'test@care.com.br',
      name: 'admin',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    await confirmationCode.execute({
      user_id: user.id,
      code: user.verification_code,
    });

    expect(user.verified_account).toBe(true);
    expect(user.user_type_id).toBe('1');
  });
});
