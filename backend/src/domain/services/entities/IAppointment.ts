interface IAppointment {
  id: string;

  service_id: string;

  doctor_id: string;

  time_minutes: number;

  Date: Date;
}

export default IAppointment;
