import React, { FC, useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  name: string;
}

const SignUp: FC = () => {
  const history = useHistory();

  const { signUp } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: DataForm) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatório'),
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await signUp({
          email: data.email,
          name: data.name,
          password: data.password,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [history, signUp],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Entrar</h1>

        <Input name="email" placeholder="E-mail: " />
        <Input name="name" placeholder="Nome: " />
        <Input name="password" type="password" placeholder="Senha:" />

        <Button type="submit" uppercase>
          Cadastrar
        </Button>

        <Link className="signin" to="/">
          Acessar conta!
        </Link>
      </Form>
    </Container>
  );
};

export default SignUp;
