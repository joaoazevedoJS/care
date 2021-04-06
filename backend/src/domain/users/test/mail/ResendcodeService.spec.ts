import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';

import ResendcodeService from '@domain/users/services/mail/ResendcodeService';
import FakeSendMailProvider from '@shared/providers/SendMailProvider/mock/FakeSendMailProvider';
import FakeGenerateCodeProvider from '@shared/providers/GenerateCodeProvider/mock/FakeGenerateCodeProvider';

describe('Resend code', () => {
  it('should be able updated verification code', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeGenerateCode = new FakeGenerateCodeProvider();
    const fakeSendMail = new FakeSendMailProvider();

    const resendCode = new ResendcodeService(
      fakeRepository,
      fakeGenerateCode,
      fakeSendMail,
    );

    const user = await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test one',
      password: '@A4321test',
      verification_code: '123456',
    });

    const userTest = await resendCode.execute(user.id);

    expect(userTest.verification_code).toBe('test6');
    expect(userTest.mail_resend_count).toBe(1);
  });

  it('should not be able updated verification code to user non exist', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeGenerateCode = new FakeGenerateCodeProvider();
    const fakeSendMail = new FakeSendMailProvider();

    const resendCode = new ResendcodeService(
      fakeRepository,
      fakeGenerateCode,
      fakeSendMail,
    );

    await expect(resendCode.execute('test')).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able updated verification code to user already authenticated', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeGenerateCode = new FakeGenerateCodeProvider();
    const fakeSendMail = new FakeSendMailProvider();

    const resendCode = new ResendcodeService(
      fakeRepository,
      fakeGenerateCode,
      fakeSendMail,
    );

    const user = await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test one',
      password: '@A4321test',
      verification_code: '123456',
    });

    user.verified_account = true;

    fakeRepository.update(user);

    await expect(resendCode.execute(user.id)).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able updated verification code when reach max limit of email sent', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeGenerateCode = new FakeGenerateCodeProvider();
    const fakeSendMail = new FakeSendMailProvider();

    const resendCode = new ResendcodeService(
      fakeRepository,
      fakeGenerateCode,
      fakeSendMail,
    );

    const user = await fakeRepository.create({
      email: 'test@gmail.com',
      name: 'test one',
      password: '@A4321test',
      verification_code: '123456',
    });

    fakeRepository.updateResendcode({ user, code: user.verification_code });
    fakeRepository.updateResendcode({ user, code: user.verification_code });
    fakeRepository.updateResendcode({ user, code: user.verification_code });

    await expect(resendCode.execute(user.id)).rejects.toBeInstanceOf(AppError);
  });
});
