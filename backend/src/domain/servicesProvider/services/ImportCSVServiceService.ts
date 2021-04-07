import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import IService from '../entities/IServices';
import IServicesRepository from '../repositories/IServicesRepository';

interface IFile {
  path: string;
}

@injectable()
class ImportCSVServiceService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(file: IFile): Promise<IService[]> {
    const services: Array<IService> = [];

    const { titles, columns } = await this.storageProvider.readCSV(file.path);

    await this.storageProvider.deleteFile(file.path);

    const indexName = titles.indexOf('nome');
    const indexDescription = titles.indexOf('descricao');
    const indexPrice = titles.indexOf('preco');
    const indexPercent = titles.indexOf('porcentagem');

    await Promise.all(
      columns.map(async lines => {
        const name = lines[indexName];
        const description = lines[indexDescription];
        const price = lines[indexPrice];
        const percent = lines[indexPercent];

        const service = await this.servicesRepository.create({
          name,
          description,
          price: Number(price),
          percentage_commission: Number(percent),
        });

        services.push(service);
      }),
    );

    return services;
  }
}

export default ImportCSVServiceService;
