import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import FakeUsersTypeRepository from '@domain/users/mock/FakeUsersTypeRepository';
import FakeHashProvider from '@domain/users/providers/HashProvider/mock/FakeHashProvider';
import FakeGenerateCodeProvider from '@shared/providers/GenerateCodeProvider/mock/FakeGenerateCodeProvider';

import CreateDoctorService from '@domain/users/services/CreateDoctorService';
import FakeSendMailProvider from '@shared/providers/SendMailProvider/mock/FakeSendMailProvider';

describe('Create Doctor', () => {
  it('should be able to create a new doctor', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeHash = new FakeHashProvider();
    const fakeGenerateCode = new FakeGenerateCodeProvider();
    const fakeSendMail = new FakeSendMailProvider();

    const createUser = new CreateDoctorService(
      fakeRepository,
      fakeUserTypeRepository,
      fakeHash,
      fakeGenerateCode,
      fakeSendMail,
    );

    const admin = await fakeRepository.create({
      email: 'test@care.com.br',
      name: 'admin',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '1',
    });

    const user = await createUser.execute({
      admin_id: admin.id,
      email: 'test@gmail.com',
      name: 'doctor',
      password: '@A4321test',
    });

    expect(user).toHaveProperty('id');
    expect(user.user_type_id).toBe('2');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeHash = new FakeHashProvider();
    const fakeGenerateCode = new FakeGenerateCodeProvider();
    const fakeSendMail = new FakeSendMailProvider();

    const createUser = new CreateDoctorService(
      fakeRepository,
      fakeUserTypeRepository,
      fakeHash,
      fakeGenerateCode,
      fakeSendMail,
    );

    const admin = await fakeRepository.create({
      email: 'test@care.com.br',
      name: 'admin',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '1',
    });

    await createUser.execute({
      admin_id: admin.id,
      email: 'test@gmail.com',
      name: 'doctor',
      password: '@A4321test',
    });

    await expect(
      createUser.execute({
        admin_id: admin.id,
        email: 'test@gmail.com',
        name: 'doctor two',
        password: '@A4321test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user when user is not admin', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeHash = new FakeHashProvider();
    const fakeGenerateCode = new FakeGenerateCodeProvider();
    const fakeSendMail = new FakeSendMailProvider();

    const createUser = new CreateDoctorService(
      fakeRepository,
      fakeUserTypeRepository,
      fakeHash,
      fakeGenerateCode,
      fakeSendMail,
    );

    const admin = await fakeRepository.create({
      email: 'test@care.com.br',
      name: 'admin',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    await expect(
      createUser.execute({
        admin_id: admin.id,
        email: 'test@gmail.com',
        name: 'doctor',
        password: '@A4321test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
