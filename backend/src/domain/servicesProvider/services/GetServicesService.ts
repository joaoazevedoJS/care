import { inject, injectable } from 'tsyringe';

import IService from '../entities/IServices';
import IServicesRepository from '../repositories/IServicesRepository';

@injectable()
class GetServicesService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
  ) {}

  public async execute(): Promise<IService[]> {
    const services = await this.servicesRepository.findAll();

    return services;
  }
}

export default GetServicesService;
