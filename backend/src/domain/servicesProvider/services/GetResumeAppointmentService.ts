import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import IAppointment from '../entities/IAppointments';
import IServicesRepository from '../repositories/IServicesRepository';

interface IResponse {
  appointment: IAppointment;
  doctor: {
    id: string;
    email: string;
    name: string;
    percentagem: number;
    user_avatar: string;
  };
  user?: {
    id: string;
    email: string;
    name: string;
    user_avatar: string;
  };
}

@injectable()
class GetResumeAppointmentService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,

    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute(appointment_id: string): Promise<IResponse> {
    const appointment = await this.appointmentRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Appointment not found.', 404);
    }

    const service = await this.servicesRepository.findById(
      appointment.service_id,
    );

    if (!service) {
      throw new AppError('Service not found.', 404);
    }

    const doctorEntity = await this.usersRepository.findById(
      appointment.doctor_id,
    );

    if (!doctorEntity) {
      throw new AppError('Doctor not found!', 404);
    }

    const userEntity = await this.usersRepository.findById(appointment.user_id);

    const doctor = {
      id: doctorEntity.id,
      email: doctorEntity.email,
      name: doctorEntity.name,
      percentagem:
        Number(service.price) * (Number(service.percentage_commission) / 100),
      user_avatar: doctorEntity.user_avatar,
    };

    let user;

    if (userEntity) {
      user = {
        id: userEntity.id,
        email: userEntity.email,
        name: userEntity.name,
        user_avatar: userEntity.user_avatar,
      };
    }

    return { appointment, doctor, user };
  }
}

export default GetResumeAppointmentService;
