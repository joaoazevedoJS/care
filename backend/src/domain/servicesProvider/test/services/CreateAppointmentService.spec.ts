import 'reflect-metadata';
import { addDays } from 'date-fns';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import FakeUsersTypeRepository from '@domain/users/mock/FakeUsersTypeRepository';
import FakeServicesRepository from '@domain/servicesProvider/mock/FakeServicesRepository';
import FakeAppointmentRepository from '@domain/servicesProvider/mock/FakeAppointmentRepository';
import FakeStatusRepository from '@domain/servicesProvider/mock/FakeStatusRepository';

import CreateAppointmentService from '@domain/servicesProvider/services/CreateAppointmentService';

describe('Create Appointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const createAppointment = new CreateAppointmentService(
      fakeUserRepository,
      fakeUserTypeRepository,
      fakeServiceRepository,
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const doctor = await fakeUserRepository.create({
      email: 'doctor@test.com.br',
      name: 'doctor',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '2',
    });

    const service = await fakeServiceRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    const appointment = await createAppointment.execute({
      doctor_id: doctor.id,
      service_id: service.id,
      date: addDays(new Date(), 1),
      time_minutes: 43,
      status_id: '1',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new appointment when is not a doctor', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const createAppointment = new CreateAppointmentService(
      fakeUserRepository,
      fakeUserTypeRepository,
      fakeServiceRepository,
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const user = await fakeUserRepository.create({
      email: 'test@gmail.com',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    const service = await fakeServiceRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await expect(
      createAppointment.execute({
        doctor_id: user.id,
        service_id: service.id,
        date: addDays(new Date(), 1),
        time_minutes: 43,
        status_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment when non exists services', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const createAppointment = new CreateAppointmentService(
      fakeUserRepository,
      fakeUserTypeRepository,
      fakeServiceRepository,
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const doctor = await fakeUserRepository.create({
      email: 'test@gmail.com',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '2',
    });

    await expect(
      createAppointment.execute({
        doctor_id: doctor.id,
        service_id: 'test_id',
        date: addDays(new Date(), 1),
        time_minutes: 43,
        status_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment when date is invalid', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeUserTypeRepository = new FakeUsersTypeRepository();
    const fakeServiceRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeStatusRepository = new FakeStatusRepository();

    const createAppointment = new CreateAppointmentService(
      fakeUserRepository,
      fakeUserTypeRepository,
      fakeServiceRepository,
      fakeAppointmentRepository,
      fakeStatusRepository,
    );

    const doctor = await fakeUserRepository.create({
      email: 'test@gmail.com',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '2',
    });

    const service = await fakeServiceRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    await expect(
      createAppointment.execute({
        doctor_id: doctor.id,
        service_id: service.id,
        date: new Date('1111/11/11'),
        time_minutes: 43,
        status_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
