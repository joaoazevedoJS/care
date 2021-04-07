import 'reflect-metadata';

import FakeServicesRepository from '@domain/servicesProvider/mock/FakeServicesRepository';
import FakeAppointmentRepository from '@domain/servicesProvider/mock/FakeAppointmentRepository';
import GetAppointmentsService from '@domain/servicesProvider/services/GetAppointmentsService';

describe('Get Appointments', () => {
  it('should be able to list appointments', async () => {
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();

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
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
    });

    await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
    });

    const getAppointments = new GetAppointmentsService(
      fakeAppointmentRepository,
    );

    const services = await getAppointments.execute(service.id);

    expect(services).toHaveLength(3);
  });
});
