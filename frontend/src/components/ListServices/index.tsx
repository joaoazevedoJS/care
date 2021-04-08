import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useService } from '../../hooks/services';

import DefaultImage from '../../assets/images/defaultImage.png';

import { Container } from './styles';

const ListServices: FC = () => {
  const history = useHistory();

  const { services } = useService();

  const handleNavigateToAppointments = useCallback(
    (service_id: string) => {
      history.push(`/appointments/${service_id}`);
    },
    [history],
  );

  return (
    <Container>
      {services.map(service => (
        <li key={service.id}>
          <button
            type="button"
            onClick={() => handleNavigateToAppointments(service.id)}
          >
            <img
              src={
                service.image
                  ? `http://localhost:3333/uploads/${service.image}`
                  : DefaultImage
              }
              alt="service"
            />

            <div>
              <p>{service.name}</p>
              <strong>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(service.price)}
              </strong>
            </div>
          </button>
        </li>
      ))}
    </Container>
  );
};

export default ListServices;
