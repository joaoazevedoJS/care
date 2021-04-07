import { getRepository, Repository } from 'typeorm';

import IAppointmentRepository from '@domain/servicesProvider/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@domain/servicesProvider/dtos/ICreateAppointmentDTO';
import IAppointment from '@domain/servicesProvider/entities/IAppointments';

import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointmentRepository {
  private repository: Repository<IAppointment>;

  constructor() {
    this.repository = getRepository(Appointment);
  }

  public async create(data: ICreateAppointmentDTO): Promise<IAppointment> {
    const appointment = this.repository.create(data);

    await this.repository.save(appointment);

    return appointment;
  }

  public async findById(
    appointment_id: string,
  ): Promise<IAppointment | undefined> {
    const appointment = await this.repository.findOne(appointment_id);

    return appointment;
  }

  public async update(appointment: IAppointment): Promise<void> {
    await this.repository.save(appointment);
  }

  public async findAll(service_id: string): Promise<IAppointment[]> {
    const appointments = await this.repository.find({ where: { service_id } });

    return appointments;
  }
}

export default AppointmentRepository;
