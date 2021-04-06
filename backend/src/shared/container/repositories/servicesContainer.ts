import { container } from 'tsyringe';

import IServicesRepository from '@domain/servicesProvider/repositories/IServicesRepository';
import ServicesRepository from '@domain/servicesProvider/infra/typeorm/repositories/ServicesRepository';

container.registerSingleton<IServicesRepository>(
  'ServicesRepository',
  ServicesRepository,
);
