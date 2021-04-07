import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { getTime, isAfter, isValid } from 'date-fns';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IUsersTypeRepository from '@domain/users/repositories/IUsersTypeRepository';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IAppointment from '../entities/IAppointments';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import IServicesRepository from '../repositories/IServicesRepository';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTypeRepository')
    private usersTypeRepository: IUsersTypeRepository,

    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,

    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    service_id,
    doctor_id,
    time_minutes,
    date,
  }: ICreateAppointmentDTO): Promise<IAppointment> {
    const doctor = await this.usersRepository.findById(doctor_id);

    const isDoctor = await this.usersTypeRepository.getDoctorTypeId();

    if (!doctor || doctor.user_type_id !== isDoctor) {
      throw new AppError('Only doctor can register a appointment!', 401);
    }

    const service = await this.servicesRepository.findById(service_id);

    if (!service) {
      throw new AppError('Service not found.', 404);
    }

    const timenow = getTime(new Date());
    const dateBeforeAllowed = isAfter(timenow, date);

    if (!isValid(date) || dateBeforeAllowed) {
      throw new AppError('Invalide date', 401);
    }

    const appointment = await this.appointmentRepository.create({
      service_id,
      doctor_id,
      date,
      time_minutes,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
