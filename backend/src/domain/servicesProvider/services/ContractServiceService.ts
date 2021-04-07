import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

import IAppointment from '../entities/IAppointments';

interface IRequest {
  user_id: string;
  appointment_id: string;
}

@injectable()
class ContractServiceService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    user_id,
    appointment_id,
  }: IRequest): Promise<IAppointment> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Only user authenticated can contract a service!',
        401,
      );
    }

    const appointment = await this.appointmentRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Appointment not found.', 404);
    }

    if (user.id === appointment.doctor_id) {
      throw new AppError('You cannot hire your services', 401);
    }

    appointment.user_id = user_id;

    await this.appointmentRepository.update(appointment);

    return appointment;
  }
}

export default ContractServiceService;
