interface ICreateAppointmentDTO {
  service_id: string;

  doctor_id: string;

  time_minutes: number;

  date: Date;

  status_id: string;
}

export default ICreateAppointmentDTO;
