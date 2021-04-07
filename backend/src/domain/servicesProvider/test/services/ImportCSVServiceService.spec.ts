import 'reflect-metadata';

import FakeServicesRepository from '@domain/servicesProvider/mock/FakeServicesRepository';
import ImportCSVServiceService from '@domain/servicesProvider/services/ImportCSVServiceService';
import FakeStorageProvider from '@shared/providers/StorageProvider/mock/FakeStorageProvider';

describe('import csv', () => {
  it('should be able import csv of services', async () => {
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const importCSVService = new ImportCSVServiceService(
      fakeServiceRepository,
      fakeStorageProvider,
    );

    const services = await importCSVService.execute({ path: 'service' });

    expect(services).toHaveLength(3);
  });
});
