import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Platform } from 'react-native';

import { format } from 'date-fns';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersList,
  ProvidersListContainer,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  Content
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import DateTimePicker from '@react-native-community/datetimepicker';

interface RouteParams {

  providerId: string;

}

export interface Provider {

  id: string;
  name: string;
  avatar_url: string;

}

interface AvailabilityItem {

  hour: number;
  available: boolean;

}

const CreateAppointment: React.FC = () => {

  const route = useRoute();

  const [dayAvailability, setDayAvailability] = useState<AvailabilityItem[]>([]);

  const [providers, setProviders] = useState<Provider[]>([]);

  const routeParams = route.params as RouteParams;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedHour, setSelectedHour] = useState(0);

  const { user } = useAuth();

  const { goBack } = useNavigation();

  const navigateBack = useCallback(() => {

    goBack();

  }, [goBack]);

  useEffect(() => {

    api.get('/providers').then(response => {

      setProviders(response.data)

  })}, []);

  useEffect(() => {

    api.get(`/providers/${selectedProvider}/day-availability`, {

      params: {

        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()

      }

    }).then(response => {

      setDayAvailability(response.data);

    })

  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback((providerId: string) => {

    setSelectedProvider(providerId);

  }, []);

  const handleToggleDatePicker = useCallback(() => {

    setShowDatePicker(state => !state);

  }, []);

  const handleDateChanged = useCallback((event: any, date: Date | undefined) => {

    if(Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if(date) {
      setSelectedDate(date);
    }

  }, []);

  const handleSelectHour = useCallback((hour: number) => {

    setSelectedHour(hour);

  }, []);

  const morningAvailability = useMemo(() => {

    return dayAvailability
    .filter(({ hour }) => hour < 12)
    .map(({hour, available}) => {
      return {

        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),

      };

    })

  }, [dayAvailability]);

  const afternoonAvailability = useMemo(() => {

    return dayAvailability
    .filter(({ hour }) => hour >= 12)
    .map(({hour, available}) => {
      return {

        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),

      };

    })

  }, [dayAvailability]);

  return (

    <Container>

      <Header>

        <BackButton onPress={navigateBack}>

          <Icon name="chevron-left" size={24} color="#999591" />

        </BackButton>

        <HeaderTitle> Cabeleireiros </HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }}/>

      </Header>

      <Content>

        <ProvidersListContainer>

          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (

              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}

              >

                <ProviderAvatar source={{ uri: provider.avatar_url }}></ProviderAvatar>
                <ProviderName selected={provider.id === selectedProvider}>
                  { provider.name }
                </ProviderName>
              </ProviderContainer>

            )}

          />

        </ProvidersListContainer>

        <Calendar>

          <Title>

            Escolha a data

          </Title>

          <OpenDatePickerButton onPress={handleToggleDatePicker}>

            <OpenDatePickerButtonText>
              Selecionar outra data
            </OpenDatePickerButtonText>

          </OpenDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              {...(Platform.OS === 'ios' && { textColor:'#f4ede8' })}
              mode="date"
              onChange={handleDateChanged}
              display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
              value={selectedDate}
            />
          )}

        </Calendar>

        <Schedule>

          <Title> Escolha o horário </Title>

          <Section>

            <SectionTitle>

              Manhã

            </SectionTitle>

            <SectionContent>

              {morningAvailability.map(({ hourFormatted, available, hour }) => (

                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  available={available}
                  key={hourFormatted}
                  onPress={() => handleSelectHour(hour)}
                >
                  <HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </HourText>
                </Hour>

              ))}

            </SectionContent>

          </Section>

          <Section>

            <SectionTitle>

              Tarde

            </SectionTitle>

            <SectionContent>

              {afternoonAvailability.map(({ hourFormatted, available, hour }) => (

                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  available={available}
                  key={hourFormatted}
                  onPress={() => handleSelectHour(hour)}
                >
                  <HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </HourText>
                </Hour>

              ))}

            </SectionContent>

          </Section>

        </Schedule>

      </Content>

    </Container>
  );

}

export default CreateAppointment;
