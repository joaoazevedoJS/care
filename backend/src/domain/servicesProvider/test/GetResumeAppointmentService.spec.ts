import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@domain/users/mock/FakeUsersRepository';
import { addDays } from 'date-fns';
import FakeServicesRepository from '../mock/FakeServicesRepository';
import FakeAppointmentRepository from '../mock/FakeAppointmentRepository';
import GetResumeAppointmentService from '../services/GetResumeAppointmentService';

describe('Get Resume', () => {
  it('should be able to get resume', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const getResume = new GetResumeAppointmentService(
      fakeUsersRepository,
      fakeServicesRepository,
      fakeAppointmentRepository,
    );

    const user = await fakeUsersRepository.create({
      email: 'user@gmail.com',
      name: 'user',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '3',
    });

    const doctor = await fakeUsersRepository.create({
      email: 'doctor@test.com.br',
      name: 'doctor',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '2',
    });

    const service = await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    const appointment = await fakeAppointmentRepository.create({
      doctor_id: doctor.id,
      service_id: service.id,
      date: addDays(new Date(), 1),
      time_minutes: 43,
      status_id: '1',
    });

    appointment.user_id = user.id;

    const resume = await getResume.execute(appointment.id);

    expect(resume).toHaveProperty('appointment');
    expect(resume).toHaveProperty('doctor');
    expect(resume).toHaveProperty('user');
  });

  it('should be able to get resume without user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const getResume = new GetResumeAppointmentService(
      fakeUsersRepository,
      fakeServicesRepository,
      fakeAppointmentRepository,
    );

    const doctor = await fakeUsersRepository.create({
      email: 'doctor@test.com.br',
      name: 'doctor',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '2',
    });

    const service = await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    const appointment = await fakeAppointmentRepository.create({
      doctor_id: doctor.id,
      service_id: service.id,
      date: addDays(new Date(), 1),
      time_minutes: 43,
      status_id: '1',
    });

    const resume = await getResume.execute(appointment.id);

    expect(resume.user).toBe(undefined);
  });

  it('should not be able to get resume when appointment non exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const getResume = new GetResumeAppointmentService(
      fakeUsersRepository,
      fakeServicesRepository,
      fakeAppointmentRepository,
    );

    await expect(getResume.execute('appointment.id')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to get resume when service non exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const getResume = new GetResumeAppointmentService(
      fakeUsersRepository,
      fakeServicesRepository,
      fakeAppointmentRepository,
    );

    const doctor = await fakeUsersRepository.create({
      email: 'doctor@test.com.br',
      name: 'doctor',
      password: '@A4321test',
      verification_code: '123456',
      user_type_id: '2',
    });

    const appointment = await fakeAppointmentRepository.create({
      doctor_id: doctor.id,
      service_id: 'service.id',
      date: addDays(new Date(), 1),
      time_minutes: 43,
      status_id: '1',
    });

    await expect(getResume.execute(appointment.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to get resume when doctor non exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeServicesRepository = new FakeServicesRepository();
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const getResume = new GetResumeAppointmentService(
      fakeUsersRepository,
      fakeServicesRepository,
      fakeAppointmentRepository,
    );

    const service = await fakeServicesRepository.create({
      name: 'test',
      description: 'service test',
      price: 105.25,
      percentage_commission: 20,
    });

    const appointment = await fakeAppointmentRepository.create({
      doctor_id: 'doctor.id',
      service_id: service.id,
      date: addDays(new Date(), 1),
      time_minutes: 43,
      status_id: '1',
    });

    await expect(getResume.execute(appointment.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
