import React, { useCallback, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Icon from 'react-native-vector-icons/Feather';

// STYLED COMPONENTS
import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton
} from './styles';

// COMPONENTES
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {

  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);

  const old_passwordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmation_passwordInputRef = useRef<TextInput>(null);

  const { user } = useAuth();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
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

        await api.post('/users', data);

        Alert.alert(

          'Cadastro realizado com sucesso',
          'Você já pode fazer seu logon!',

        )

       navigation.goBack();

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(

          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente!',

        );

      }
    },
    [navigation],
  );

  const handleGoBack = useCallback(() => {

    navigation.goBack()

  }, [navigation]);

  return (

    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? 'padding' : undefined}
        enabled
      >

        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>

          <Container>

            <BackButton onPress={handleGoBack}>

              <Icon name='chevron-left' size={24} color="#999591" />

            </BackButton>

            <UserAvatarButton onPress={() => {}}>

              <UserAvatar source={{ uri: user.avatar_url }}/>

            </UserAvatarButton>

            <View>
              <Title> Meu perfil </Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>

              <Input

                autoCapitalize='words'
                name='name'
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {

                 emailInputRef.current?.focus();

                }}

              />

              <Input

                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name='email'
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {

                  old_passwordInputRef.current?.focus();

                }}

              />

              <Input

                ref={old_passwordInputRef}
                secureTextEntry
                name='old_password'
                icon="lock"
                placeholder="Senha atual"
                textContentType="newPassword"
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {

                  passwordInputRef.current?.focus();

                }}
              />

              <Input

                ref={passwordInputRef}
                secureTextEntry
                name='password'
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {

                  confirmation_passwordInputRef.current?.focus();

                }}
              />

              <Input

                ref={confirmation_passwordInputRef}
                secureTextEntry
                name='password_confirmation'
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm() }

              />

              <Button onPress={() => {

                formRef.current?.submitForm();

              }}>

                Confirmar mudanças

              </Button>

            </Form>

          </Container>

        </ScrollView>

      </KeyboardAvoidingView>

    </>

  );

}

export default Profile;
