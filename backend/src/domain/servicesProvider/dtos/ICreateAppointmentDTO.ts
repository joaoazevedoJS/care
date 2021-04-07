interface ICreateAppointmentDTO {
  service_id: string;

  doctor_id: string;

  time_minutes: number;

  date: Date;
}

export default ICreateAppointmentDTO;
