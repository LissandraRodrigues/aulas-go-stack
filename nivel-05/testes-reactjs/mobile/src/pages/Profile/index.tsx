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

import ImagePicker from 'react-native-image-picker';

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

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {

  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);

  const old_passwordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmation_passwordInputRef = useRef<TextInput>(null);

  const { user, updateUser } = useAuth();

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),

          password: Yup.string().when('old_password', {
            is: true,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),

          password_confirmation: Yup.string()
            .when('old_password', {
              is: true,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
        });

        await schema.validate(data, {
          // Faz com que o Yup não pare no primeiro erro. Por padrão é true.
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data)

        Alert.alert(

          'Perfil atualizado com sucesso!',

        )

       navigation.goBack();

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(

          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente!',

        );

      }
    },
    [navigation, updateUser],
  );

  const handleGoBack = useCallback(() => {

    navigation.goBack()

  }, [navigation]);

  const handleUpdateAvatar = useCallback(() => {

    ImagePicker.showImagePicker({

      title: 'Selecione uma imagem',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar câmera',
      chooseFromLibraryButtonTitle: 'Escolher da galeria'

    }, response => {

      if (response.didCancel) {

        return;

      }

      if (response.error) {

        Alert.alert("Erro ao atualizar seu avatar.");
        return;

      }

      const data = new FormData();

      data.append('avatar', {

        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: response.uri,

      });

      api.patch('users/avatar', data).then(apiResponse => {

        updateUser(apiResponse.data);

      });

    });

  }, [updateUser, user.id]);

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

            <UserAvatarButton onPress={handleUpdateAvatar}>

              <UserAvatar source={{ uri: user.avatar_url }}/>

            </UserAvatarButton>

            <View>
              <Title> Meu perfil </Title>
            </View>

            <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>

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