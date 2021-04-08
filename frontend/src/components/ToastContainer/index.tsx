import { FC } from 'react';

import { Alert } from './Toast';

import { useToast } from '../../hooks/toast';

import { Container } from './styles';

const ToastContainer: FC = () => {
  const { messages } = useToast();

  return (
    <Container>
      {messages.map(item => (
        <Alert key={item.id} message={item} />
      ))}
    </Container>
  );
};

export { ToastContainer };
