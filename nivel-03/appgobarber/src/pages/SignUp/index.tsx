import React, { useCallback, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';

import { View, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {

  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSignUp = useCallback((data: object) => {

    console.log(data);

  }, []);

  return (

    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? 'padding' : undefined}
        enabled
      >

        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>

          <Container>

            <Image source={logoImg} />

            <View>
              <Title> Crie sua conta </Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>

              <Input name='name' icon="user" placeholder="Nome"/>
              <Input name='email' icon="mail" placeholder="E-mail"/>
              <Input name='password' icon="lock" placeholder="Senha"/>

              <Button onPress={() => {

                formRef.current?.submitForm();

              }}>

                Cadastrar

              </Button>

            </Form>

          </Container>

        </ScrollView>

      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => { navigation.goBack()}}>

        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <BackToSignInText> Voltar para logon </BackToSignInText>

      </BackToSignIn>

    </>

  );

}

export default SignUp;
