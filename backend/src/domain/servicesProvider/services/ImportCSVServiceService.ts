import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IUsersTypeRepository from '@domain/users/repositories/IUsersTypeRepository';
import IService from '../entities/IServices';
import IServicesRepository from '../repositories/IServicesRepository';

interface IRequest {
  file: { path: string };
  admin_id: string;
}

@injectable()
class ImportCSVServiceService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTypeRepository')
    private usersTypeRepository: IUsersTypeRepository,
  ) {}

  public async execute({ file, admin_id }: IRequest): Promise<IService[]> {
    const admin = await this.usersRepository.findById(admin_id);

    const isAdmin = await this.usersTypeRepository.getAdminTypeId();

    if (!admin || admin.user_type_id !== isAdmin) {
      throw new AppError('Only admin can import csv!', 401);
    }

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
