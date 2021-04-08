import IUsers from '@domain/users/entities/IUsers';

interface IAppointment {
  id: string;

  service_id: string;

  doctor_id: string;

  doctor: Omit<IUsers, 'password' | 'verification_code'>;

  user_id: string;

  status_id: string;

  time_minutes: number;

  service_time: number;

  date: Date;

  created_at: Date;

  updated_at: Date;
}

export default IAppointment;
