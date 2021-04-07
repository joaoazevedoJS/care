import { getRepository, Repository } from 'typeorm';

import IServicesRepository from '@domain/servicesProvider/repositories/IServicesRepository';
import IService from '@domain/servicesProvider/entities/IServices';
import ICreateServiceDTO from '@domain/servicesProvider/dtos/ICreateServiceDTO';
import Service from '../entities/Service';

class ServicesRepository implements IServicesRepository {
  private repository: Repository<IService>;

  constructor() {
    this.repository = getRepository(Service);
  }

  public async create(data: ICreateServiceDTO): Promise<IService> {
    const service = this.repository.create(data);

    await this.repository.save(service);

    return service;
  }

  public async findById(service_id: string): Promise<IService | undefined> {
    const service = await this.repository.findOne(service_id);

    return service;
  }

  public async update(service: IService): Promise<void> {
    await this.repository.save(service);
  }

  public async findAll(): Promise<IService[]> {
    const services = await this.repository.find();

    return services;
  }
}

export default ServicesRepository;
