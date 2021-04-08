import { FC, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface DataForm {
  code: string;
}

const ConfirmationCode: FC = () => {
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: DataForm) => {
      try {
        const schema = Yup.object().shape({
          code: Yup.string()
            .length(6, 'Código inválido')
            .required('Informe o código!'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.patch('/users/authenticated', { code: data.code });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Código inválido',
          type: 'error',
        });
      }
    },
    [addToast, history],
  );

  const handleResendCode = useCallback(async () => {
    await api.post('/mails/resendcode');
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Confirme sua conta!</h1>

        <Input name="code" placeholder="Código: " maxLength={6} />

        <Button type="submit" uppercase>
          Confirmar conta!
        </Button>

        <Button type="button" blue onClick={handleResendCode}>
          Reenviar código
        </Button>
      </Form>
    </Container>
  );
};

export default ConfirmationCode;
