import { v4 as uuid } from 'uuid';

import IServicesRepository from '@domain/servicesProvider/repositories/IServicesRepository';
import IService from '@domain/servicesProvider/entities/IServices';
import ICreateServiceDTO from '@domain/servicesProvider/dtos/ICreateServiceDTO';

class FakeServicesRepository implements IServicesRepository {
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
      image: '',
      percentage_commission,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.repository.push(service);

    return service;
  }

  public async findById(service_id: string): Promise<IService | undefined> {
    const service = this.repository.find(serv => serv.id === service_id);

    return service;
  }

  public async update(service: IService): Promise<void> {
    const findIndex = this.repository.findIndex(serv => serv.id === service.id);

    if (findIndex >= 0) {
      this.repository[findIndex] = service;
    } else {
      this.repository.push(service);
    }
  }

  public async findAll(): Promise<IService[]> {
    return this.repository;
  }
}

export default FakeServicesRepository;
