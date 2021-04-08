import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DefaultAvatar from '../../assets/images/defaultAvatar.png';

import { Container } from './styles';
import { useService, Appointment } from '../../hooks/services';

interface IParams {
  service_id: string;
}

const Appointments: FC = () => {
  const params = useParams<IParams>();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { getAppointments } = useService();

  useEffect(() => {
    async function load() {
      const response = await getAppointments(params.service_id);

      setAppointments(response);
    }

    load();
  }, [getAppointments, params]);

  return (
    <Container>
      <h1>Doutores disponiveis:</h1>

      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            <img
              src={
                appointment.doctor.user_avatar
                  ? `http://localhost:3333/uploads/${appointment.doctor.user_avatar}`
                  : DefaultAvatar
              }
              alt={appointment.doctor.name}
            />

            <div>
              <p>{appointment.doctor.name}</p>

              <strong>{appointment.time_minutes}m</strong>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Appointments;
