import { v4 as uuid} from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppointment = this.appointments.find(
            appointment => isEqual(appointment.date, date)
        );

        return findAppointment;
    }

    public async findAllInMonthProvider({ provider_id, month, year }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {

        const appointments = this.appointments.filter(appointment =>

                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year

        );

        return appointments;
    }

    public async findAllInDayProvider({ provider_id, day, month, year }: IFindAllInDayProviderDTO): Promise<Appointment[]> {

        const appointments = this.appointments.filter(appointment =>

                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year

        );

        return appointments;
    }

    public async create({ provider_id, user_id, date}: ICreateAppointmentDTO): Promise<Appointment> {

        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id, user_id })

        this.appointments.push(appointment);

        return appointment;

    }

}

export default AppointmentsRepository;
