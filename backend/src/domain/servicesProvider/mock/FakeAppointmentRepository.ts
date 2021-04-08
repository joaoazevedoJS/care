import { v4 as uuid } from 'uuid';

import IUsers from '@domain/users/entities/IUsers';
import IAppointmentRepository from '../repositories/IAppointmentRepository';
import IAppointment from '../entities/IAppointments';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IGetAppointmentsByStatusDTO from '../dtos/IGetAppointmentsByStatusDTO';

class FakeAppointmentRepository implements IAppointmentRepository {
  private repository: IAppointment[] = [];

  public async create({
    service_id,
    doctor_id,
    date,
    time_minutes,
    status_id,
  }: ICreateAppointmentDTO): Promise<IAppointment> {
    const appointment: IAppointment = {
      id: uuid(),
      service_id,
      doctor_id,
      user_id: '',
      date,
      status_id,
      doctor: {} as IUsers,
      service_time: 0,
      time_minutes,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.repository.push(appointment);

    return appointment;
  }

  public async findById(
    appointment_id: string,
  ): Promise<IAppointment | undefined> {
    const appointment = this.repository.find(
      appoint => appoint.id === appointment_id,
    );

    return appointment;
  }

  public async update(appointment: IAppointment): Promise<void> {
    const findIndex = this.repository.findIndex(
      serv => serv.id === appointment.id,
    );

    if (findIndex >= 0) {
      this.repository[findIndex] = appointment;
    } else {
      this.repository.push(appointment);
    }
  }

  public async findAll(service_id: string): Promise<IAppointment[]> {
    const appointments = this.repository.filter(
      appointment => appointment.service_id === service_id,
    );

    return appointments;
  }

  public async findByStatus({
    status_id,
    service_id,
  }: IGetAppointmentsByStatusDTO): Promise<IAppointment[]> {
    const appointments = this.repository.filter(
      appointment =>
        appointment.service_id === service_id &&
        appointment.status_id === status_id,
    );

    return appointments;
  }
}

export default FakeAppointmentRepository;
