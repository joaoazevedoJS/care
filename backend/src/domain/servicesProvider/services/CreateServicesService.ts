import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IUsersTypeRepository from '@domain/users/repositories/IUsersTypeRepository';

import ICreateServiceDTO from '../dtos/ICreateServiceDTO';
import IService from '../entities/IServices';
import IServicesRepository from '../repositories/IServicesRepository';

interface IRequest extends ICreateServiceDTO {
  admin_id: string;
}

@injectable()
class CreateServicesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTypeRepository')
    private usersTypeRepository: IUsersTypeRepository,

    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
  ) {}

  public async execute({
    admin_id,
    name,
    description,
    price,
    percentage_commission,
  }: IRequest): Promise<IService> {
    const admin = await this.usersRepository.findById(admin_id);

    const isAdmin = await this.usersTypeRepository.getAdminTypeId();

    if (!admin || admin.user_type_id !== isAdmin) {
      throw new AppError('Only admin can register a service!', 401);
    }

    const service = await this.servicesRepository.create({
      name,
      description,
      price,
      percentage_commission,
    });

    return service;
  }
}

export default CreateServicesService;
