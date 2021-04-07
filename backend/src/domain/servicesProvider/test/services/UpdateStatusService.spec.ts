import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import UpdateStatusService from '@domain/servicesProvider/services/UpdateStatusService';
import FakeAppointmentRepository from '@domain/servicesProvider/mock/FakeAppointmentRepository';
import FakeStatusRepository from '@domain/servicesProvider/mock/FakeStatusRepository';
import FakeServicesRepository from '@domain/servicesProvider/mock/FakeServicesRepository';

describe('Update Status', () => {
  it('should be able to update appointment status to progress', async () => {
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const updateStatus = new UpdateStatusService(
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const service = await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    const appointment = await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '1',
    });

    const result = await updateStatus.execute({
      appointment_id: appointment.id,
      status: 'progress',
    });

    expect(result.status_id).toBe('2');
  });

  it('should be able to update appointment status to opening', async () => {
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const updateStatus = new UpdateStatusService(
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const service = await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    const appointment = await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '2',
    });

    const result = await updateStatus.execute({
      appointment_id: appointment.id,
      status: 'opening',
    });

    expect(result.status_id).toBe('1');
  });

  it('should be able to update appointment status to closed', async () => {
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const updateStatus = new UpdateStatusService(
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const service = await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    const appointment = await fakeAppointmentRepository.create({
      doctor_id: '1020120',
      service_id: service.id,
      date: new Date(),
      time_minutes: 40,
      status_id: '2',
    });

    const result = await updateStatus.execute({
      appointment_id: appointment.id,
      status: 'closed',
      service_time: 20,
    });

    expect(result.status_id).toBe('3');
    expect(result.service_time).toBe(20);
  });

  it('should not be able to update appointment status when appointment non exist', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const updateStatus = new UpdateStatusService(
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    await expect(
      updateStatus.execute({
        appointment_id: 'nonExistAppointment',
        status: 'progress',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
