import { v4 as uuid } from 'uuid';

import IServicesRepositories from '@domain/services/repositories/IServicesRepositories';
import IService from '@domain/services/entities/IServices';
import ICreateServiceDTO from '@domain/services/dtos/ICreateServiceDTO';

class ServicesRepositories implements IServicesRepositories {
  private repository: IService[] = [];

  public async create({
    name,
    description,
    price,
    percentage_commission,
  }: ICreateServiceDTO): Promise<IService> {
    const service: IService = {
      id: uuid(),
      name,
      description,
      price,
      percentage_commission,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.repository.push(service);

    return service;
  }
}

export default ServicesRepositories;
