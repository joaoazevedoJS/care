import 'reflect-metadata';

import FakeServicesRepository from '@domain/servicesProvider/mock/FakeServicesRepository';
import FakeAppointmentRepository from '@domain/servicesProvider/mock/FakeAppointmentRepository';
import GetAppointmentsService from '@domain/servicesProvider/services/GetAppointmentsService';
import FakeStatusRepository from '@domain/servicesProvider/mock/FakeStatusRepository';

describe('Get Appointments', () => {
  it('should be able to list appointments', async () => {
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const getAppointments = new GetAppointmentsService(
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const service = await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '1',
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '2',
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '3',
    });

    const services = await getAppointments.execute({ service_id: service.id });

    expect(services).toHaveLength(3);
  });

  it('should be able to list appointments openings', async () => {
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const getAppointments = new GetAppointmentsService(
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const service = await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '1',
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '1',
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '3',
    });

    const services = await getAppointments.execute({
      service_id: service.id,
      status: 'opening',
    });

    expect(services).toHaveLength(2);
  });

  it('should be able to list appointments in progress', async () => {
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const getAppointments = new GetAppointmentsService(
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const service = await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '2',
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '1',
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '1',
    });

    const services = await getAppointments.execute({
      service_id: service.id,
      status: 'progress',
    });

    expect(services).toHaveLength(1);
  });

  it('should be able to list appointments closeds', async () => {
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const getAppointments = new GetAppointmentsService(
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const service = await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '3',
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '3',
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '2',
    });

    const services = await getAppointments.execute({
      service_id: service.id,
      status: 'closed',
    });

    expect(services).toHaveLength(2);
  });
});
