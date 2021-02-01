import React from 'react';

import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Schedule,
  Content,
  NextAppointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span> Bem vindo, </span>
              <strong> {user.name} </strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1> Horários agendados </h1>
          <p>
            <span> Hoje </span>
            <span> Dia 01 </span>
            <span> Segunda-feira </span>
          </p>

          <NextAppointment>
            <strong> Atendimento a seguir </strong>

            <div>
              <img
                src="http://localhost:3333/files/25b6870f04bbfa6642d3-0_720x720.jpg"
                alt="Luiza Lissandra"
              />

              <strong> Luiza Lissandra </strong>

              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>

        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
