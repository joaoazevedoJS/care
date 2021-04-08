import 'reflect-metadata';

import FakeServicesRepository from '@domain/servicesProvider/mock/FakeServicesRepository';
import GetServicesService from '@domain/servicesProvider/services/GetServicesService';

describe('Get services', () => {
  it('should be able to list services', async () => {
    const fakeServicesRepository = new FakeServicesRepository();

    await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    const getServices = new GetServicesService(fakeServicesRepository);

    const services = await getServices.execute();

    expect(services).toHaveLength(4);
  });
});
