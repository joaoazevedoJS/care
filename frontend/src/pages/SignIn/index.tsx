import React, { FC, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

interface DataForm {
  email: string;
  password: string;
}

const Signin: FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: DataForm) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        signIn(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Entrar</h1>

        <Input name="email" placeholder="E-mail: " />
        <Input name="password" type="password" placeholder="Senha:" />

        <Link to="/">Esqueci a Senha</Link>

        <Button type="submit" uppercase>
          Entrar
        </Button>

        <Link className="signup" to="signup">
          Cadastre-se
        </Link>
      </Form>
    </Container>
  );
};

export default Signin;
