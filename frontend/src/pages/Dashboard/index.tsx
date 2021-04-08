import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth, User } from '../../hooks/auth';

import Button from '../../components/Button';

import DefaultAvatar from '../../assets/images/defaultAvatar.png';
import ListServices from '../../components/ListServices';

import ConfirmationCode from '../ConfirmationCode';

import { Container } from './styles';

const Dashboard: FC = () => {
  const history = useHistory();

  const [user, setUser] = useState<User>();

  const { getUser, signOut } = useAuth();

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

  if (!user.verified_account) {
    return <ConfirmationCode />;
  }

  return (
    <Container>
      <header>
        <div>
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
        </div>

        {user.user_type.type === 'admin' && (
          <Button
            onClick={() => {
              history.push('/csv');
            }}
          >
            Importar CSV
          </Button>
        )}
      </header>

      <main>
        <ListServices />
      </main>
    </Container>
  );
};

export default Dashboard;
