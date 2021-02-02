import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import { date } from 'yup/lib/locale';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Schedule,
  Content,
  NextAppointment,
  Calendar,
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

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

          <Section>
            <strong> Manhã </strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="http://localhost:3333/files/25b6870f04bbfa6642d3-0_720x720.jpg"
                  alt="Luiza Lissandra"
                />
                <strong> Luiza Lissandra </strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="http://localhost:3333/files/25b6870f04bbfa6642d3-0_720x720.jpg"
                  alt="Luiza Lissandra"
                />
                <strong> Luiza Lissandra </strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong> Tarde </strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="http://localhost:3333/files/25b6870f04bbfa6642d3-0_720x720.jpg"
                  alt="Luiza Lissandra"
                />
                <strong> Luiza Lissandra </strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="http://localhost:3333/files/25b6870f04bbfa6642d3-0_720x720.jpg"
                  alt="Luiza Lissandra"
                />
                <strong> Luiza Lissandra </strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro - ',
              'Fevereiro - ',
              'Março - ',
              'Abril - ',
              'Maio - ',
              'Junho - ',
              'Julho - ',
              'Agosto - ',
              'Setembro - ',
              'Outubro - ',
              'Novembro - ',
              'Dezembro - ',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
