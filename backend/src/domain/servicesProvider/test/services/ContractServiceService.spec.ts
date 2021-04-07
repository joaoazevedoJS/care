import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '@domain/servicesProvider/mock/FakeAppointmentRepository';
import ContractServiceService from '@domain/servicesProvider/services/ContractServiceService';
import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';

describe('Contract service', () => {
  it('should be able to contract one service', async () => {
    const fakeUsersReporitory = new FakeUsersRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const contractService = new ContractServiceService(
      fakeUsersReporitory,
      fakeAppointmentRepository,
    );

    const user = await fakeUsersReporitory.create({
      email: 'test@gmail.com.br',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '1',
    });

    const appointment = await fakeAppointmentRepository.create({
      doctor_id: 'doctor1234',
      service_id: 'test_id',
      date: new Date(),
      time_minutes: 43,
      status_id: '1',
    });

    const response = await contractService.execute({
      user_id: user.id,
      appointment_id: appointment.id,
    });

    expect(response.user_id).toBe(user.id);
  });

  it('should not be able to contract one service when user is not authenticated', async () => {
    const fakeUsersReporitory = new FakeUsersRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const contractService = new ContractServiceService(
      fakeUsersReporitory,
      fakeAppointmentRepository,
    );

    const appointment = await fakeAppointmentRepository.create({
      doctor_id: 'doctor1234',
      service_id: 'test_id',
      date: new Date(),
      time_minutes: 43,
      status_id: '1',
    });

    await expect(
      contractService.execute({
        user_id: 'user1234',
        appointment_id: appointment.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to contract one service when appointment non exist', async () => {
    const fakeUsersReporitory = new FakeUsersRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const contractService = new ContractServiceService(
      fakeUsersReporitory,
      fakeAppointmentRepository,
    );

    const user = await fakeUsersReporitory.create({
      email: 'test@gmail.com.br',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '1',
    });

    await expect(
      contractService.execute({
        user_id: user.id,
        appointment_id: 'appointment123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to contract hire your service', async () => {
    const fakeUsersReporitory = new FakeUsersRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const contractService = new ContractServiceService(
      fakeUsersReporitory,
      fakeAppointmentRepository,
    );

    const doctor = await fakeUsersReporitory.create({
      email: 'test@gmail.com.br',
      name: 'doctor',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '2',
    });

    const appointment = await fakeAppointmentRepository.create({
      doctor_id: doctor.id,
      service_id: 'test_id',
      date: new Date(),
      time_minutes: 43,
      status_id: '1',
    });

    await expect(
      contractService.execute({
        user_id: doctor.id,
        appointment_id: appointment.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
