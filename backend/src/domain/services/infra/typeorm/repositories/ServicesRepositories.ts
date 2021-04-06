import { getRepository, Repository } from 'typeorm';

import IServicesRepositories from '@domain/services/repositories/IServicesRepositories';
import IService from '@domain/services/entities/IServices';
import ICreateServiceDTO from '@domain/services/dtos/ICreateServiceDTO';
import Service from '../entities/Service';

class ServicesRepositories implements IServicesRepositories {
  private repository: Repository<IService>;

  constructor() {
    this.repository = getRepository(Service);
  }

  public async create(data: ICreateServiceDTO): Promise<IService> {
    const service = this.repository.create(data);

    await this.repository.save(service);

    return service;
  }
}

export default ServicesRepositories;
