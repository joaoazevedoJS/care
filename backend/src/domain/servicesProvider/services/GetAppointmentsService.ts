import { inject, injectable } from 'tsyringe';

import IAppointment from '../entities/IAppointments';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import IStatusRepository from '../repositories/IStatusRepository';

interface IRequest {
  service_id: string;
  status?: 'opening' | 'progress' | 'closed';
}

@injectable()
class GetAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
  ) {}

  public async execute({
    service_id,
    status,
  }: IRequest): Promise<IAppointment[]> {
    if (status) {
      const statusType = {
        opening: await this.statusRepository.getOpeningId(),
        progress: await this.statusRepository.getProgressId(),
        closed: await this.statusRepository.getClosedId(),
      };

      const status_id = statusType[status];

      const appointments = await this.appointmentRepository.findByStatus({
        service_id,
        status_id,
      });

      return appointments;
    }

    const appointments = await this.appointmentRepository.findAll(service_id);

    return appointments;
  }
}

export default GetAppointmentsService;
