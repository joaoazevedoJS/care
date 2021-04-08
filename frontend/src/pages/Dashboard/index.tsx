import { FC, useEffect, useState } from 'react';
import Button from '../../components/Button';

import { useAuth, User } from '../../hooks/auth';
import { useService } from '../../hooks/services';

import { Container } from './styles';

import DefaultImage from '../../assets/images/defaultImage.png';
import DefaultAvatar from '../../assets/images/defaultAvatar.png';

const Dashboard: FC = () => {
  const [user, setUser] = useState<User>();

  const { getUser, signOut } = useAuth();
  const { services } = useService();

  useEffect(() => {
    async function load() {
      const response = await getUser();

      setUser(response);
    }

    load();
  }, [getUser]);

  if (!user) {
    return <h1>loading...</h1>;
  }

  return (
    <Container>
      <header>
        <img
          src={
            user.user_avatar
              ? `http://localhost:3333/uploads/${user.user_avatar}`
              : DefaultAvatar
          }
          alt={user.name}
        />

        <div>
          <strong>Bem vindo {user.name}</strong>

          <Button blue onClick={signOut}>
            Sair
          </Button>
        </div>
      </header>

      <main>
        <ul>
          {services.map(service => (
            <li key={service.id}>
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
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(service.price)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </Container>
  );
};

export default Dashboard;
