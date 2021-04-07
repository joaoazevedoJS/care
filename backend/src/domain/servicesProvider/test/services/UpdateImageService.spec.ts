import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import FakeUsersTypeRepository from '@domain/users/mock/FakeUsersTypeRepository';
import FakeServicesRepository from '@domain/servicesProvider/mock/FakeServicesRepository';
import FakeStorageProvider from '@shared/providers/StorageProvider/mock/FakeStorageProvider';
import UpdateImageService from '@domain/servicesProvider/services/UpdateImageService';

describe('Create Service', () => {
  it('should be able to updated image service', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateImage = new UpdateImageService(
      fakeServiceRepository,
      fakeUserRepository,
      fakeUserTypeRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      email: 'test@care.com.br',
      name: 'admin',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '1',
    });

    const service = await fakeServiceRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await updateImage.execute({
      admin_id: user.id,
      filename: 'test.jpg',
      service_id: service.id,
    });

    expect(service.image).toBe('test.jpg');
  });

  it('should not be able to updated image service when is not admin', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateImage = new UpdateImageService(
      fakeServiceRepository,
      fakeUserRepository,
      fakeUserTypeRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      email: 'test@gmail.com',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    const service = await fakeServiceRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await expect(
      updateImage.execute({
        admin_id: user.id,
        filename: 'test.jpg',
        service_id: service.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to updated image service when service non exists', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateImage = new UpdateImageService(
      fakeServiceRepository,
      fakeUserRepository,
      fakeUserTypeRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      email: 'test@gmail.com',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '1',
    });

    await expect(
      updateImage.execute({
        admin_id: user.id,
        filename: 'test.jpg',
        service_id: 'test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able delete old image when updating new one', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateImage = new UpdateImageService(
      fakeServiceRepository,
      fakeUserRepository,
      fakeUserTypeRepository,
      fakeStorageProvider,
    );

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      email: 'test@gmail.com',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '1',
    });

    const service = await fakeServiceRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await updateImage.execute({
      admin_id: user.id,
      filename: 'oldTest.jpg',
      service_id: service.id,
    });

    await updateImage.execute({
      admin_id: user.id,
      filename: 'newTest.jpg',
      service_id: service.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('oldTest.jpg');
    expect(service.image).toBe('newTest.jpg');
  });
});
