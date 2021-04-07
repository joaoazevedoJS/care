import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IAppointment from '../entities/IAppointments';

interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<IAppointment>;
  findById(appointment_id: string): Promise<IAppointment | undefined>;
  update(appointment: IAppointment): Promise<void>;
  findAll(service_id: string): Promise<IAppointment[]>;
}

export default IAppointmentRepository;
