import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IAppointment from '../entities/IAppointments';

import IAppointmentRepository from '../repositories/IAppointmentRepository';
import IStatusRepository from '../repositories/IStatusRepository';

interface IRequest {
  appointment_id: string;
  status: 'opening' | 'progress' | 'closed';
  service_time?: number;
}

@injectable()
class UpdateStatusService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
  ) {}

  public async execute({
    appointment_id,
    status,
    service_time = 0,
  }: IRequest): Promise<IAppointment> {
    const appointment = await this.appointmentRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Appointment not found.', 404);
    }

    const statusType = {
      opening: await this.statusRepository.getOpeningId(),
      progress: await this.statusRepository.getProgressId(),
      closed: await this.statusRepository.getClosedId(),
    };

    const status_id = statusType[status];

    appointment.status_id = status_id;
    appointment.service_time = service_time;

    const appointmentWithoutStatus = { ...appointment, status: undefined };

    await this.appointmentRepository.update(appointmentWithoutStatus);

    return appointment;
  }
}

export default UpdateStatusService;
