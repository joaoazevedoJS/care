import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IUsersTypeRepository from '@domain/users/repositories/IUsersTypeRepository';
import IServicesRepository from '../repositories/IServicesRepository';

interface IRequest {
  filename: string;
  service_id: string;
  admin_id: string;
}

@injectable()
class UpdateImageService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTypeRepository')
    private usersTypeRepository: IUsersTypeRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    service_id,
    filename,
    admin_id,
  }: IRequest): Promise<void> {
    const admin = await this.usersRepository.findById(admin_id);

    const isAdmin = await this.usersTypeRepository.getAdminTypeId();

    if (!admin || admin.user_type_id !== isAdmin) {
      throw new AppError('Only admin can updated a service image!', 401);
    }

    const service = await this.servicesRepository.findById(service_id);

    if (!service) {
      throw new AppError('Service not found.', 404);
    }

    if (service.image) {
      await this.storageProvider.deleteFile(service.image);
    }

    const image = await this.storageProvider.saveFile(filename);

    service.image = image;

    await this.servicesRepository.update(service);
  }
}

export default UpdateImageService;
