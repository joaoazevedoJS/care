import { container } from 'tsyringe';

import IServicesRepository from '@domain/servicesProvider/repositories/IServicesRepository';
import ServicesRepository from '@domain/servicesProvider/infra/typeorm/repositories/ServicesRepository';

import IAppointmentRepository from '@domain/servicesProvider/repositories/IAppointmentRepository';
import AppointmentRepository from '@domain/servicesProvider/infra/typeorm/repositories/AppointmentRepository';

container.registerSingleton<IServicesRepository>(
  'ServicesRepository',
  ServicesRepository,
);

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);
