import 'reflect-metadata';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import FakeUsersTypeRepository from '@domain/users/mock/FakeUsersTypeRepository';
import FakeServicesRepository from '@domain/servicesProvider/mock/FakeServicesRepository';
import ImportCSVServiceService from '@domain/servicesProvider/services/ImportCSVServiceService';
import FakeStorageProvider from '@shared/providers/StorageProvider/mock/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

describe('import csv', () => {
  it('should be able import csv of services', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const importCSVService = new ImportCSVServiceService(
      fakeServiceRepository,
      fakeStorageProvider,
      fakeUserRepository,
      fakeUserTypeRepository,
    );

    const user = await fakeUserRepository.create({
      email: 'test@care.com.br',
      name: 'admin',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '1',
    });

    const services = await importCSVService.execute({
      admin_id: user.id,
      file: { path: 'service' },
    });

    expect(services).toHaveLength(3);
  });

  it('should not be able import csv of services when is non admin', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const importCSVService = new ImportCSVServiceService(
      fakeServiceRepository,
      fakeStorageProvider,
      fakeUserRepository,
      fakeUserTypeRepository,
    );

    const user = await fakeUserRepository.create({
      email: 'test@gmail.com.br',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    await expect(
      importCSVService.execute({
        admin_id: user.id,
        file: { path: 'service' },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
