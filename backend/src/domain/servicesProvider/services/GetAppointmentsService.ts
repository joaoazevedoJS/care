import { inject, injectable } from 'tsyringe';

import IAppointment from '../entities/IAppointments';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

@injectable()
class GetAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute(service_id: string): Promise<IAppointment[]> {
    const appointments = await this.appointmentRepository.findAll(service_id);

    return appointments;
  }
}

export default GetAppointmentsService;
