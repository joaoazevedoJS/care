interface IAppointment {
  id: string;

  service_id: string;

  doctor_id: string;

  user_id: string;

  time_minutes: number;

  date: Date;

  created_at: Date;

  updated_at: Date;
}

export default IAppointment;