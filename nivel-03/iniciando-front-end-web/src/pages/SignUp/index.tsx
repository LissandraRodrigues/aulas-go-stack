import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { Background, Container, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
      });

      await schema.validate(data, {
        // Faz com que o Yup não pare no primeiro erro. Por padrão é true.
        abortEarly: false,
      });
    } catch (err) {
      err.inner;

      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1> Faça seu cadastro </h1>

          <Input icon={FiUser} name="name" placeholder="Nome" type="text" />
          <Input icon={FiMail} name="email" placeholder="E-mail" type="email" />

          <Input
            icon={FiLock}
            name="password"
            placeholder="Senha"
            type="password"
          />

          <Button type="submit"> Cadastrar </Button>
        </Form>

        <a href="logon">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
