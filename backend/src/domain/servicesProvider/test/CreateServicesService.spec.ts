import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import FakeUsersTypeRepository from '@domain/users/mock/FakeUsersTypeRepository';
import FakeServicesRepository from '@domain/servicesProvider/mock/FakeServicesRepository';
import CreateServicesService from '@domain/servicesProvider/services/CreateServicesService';

describe('Create Service', () => {
  it('should be able to create a new service', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();

    const createService = new CreateServicesService(
      fakeUserRepository,
      fakeUserTypeRepository,
      fakeServiceRepository,
    );

    const user = await fakeUserRepository.create({
      email: 'test@care.com.br',
      name: 'admin',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '1',
    });

    const service = await createService.execute({
      name: 'test',
      admin_id: user.id,
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    expect(service).toHaveProperty('id');
  });

  it('should not be able to create a new service when is not admin', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();

    const createService = new CreateServicesService(
      fakeUserRepository,
      fakeUserTypeRepository,
      fakeServiceRepository,
    );

    const user = await fakeUserRepository.create({
      email: 'test@gmail.com',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    await expect(
      createService.execute({
        name: 'test',
        admin_id: user.id,
        description: '',
        price: 105.25,
        percentage_commission: 20,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
