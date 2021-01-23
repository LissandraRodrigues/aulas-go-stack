import { startOfHour, isBefore, getHours } from 'date-fns';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';;

interface IRequest {
    provider_id: string
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

    ) {}

    public async execute({ provider_id, date, user_id }: IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {

            throw new AppError("You can't create an appointment on a past date.");

        }

        if(user_id === provider_id) {

            throw new AppError("You can't create an appointment with yourself.");

        }

        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {

            throw new AppError("You can only create appointment between 8am and 5pm.");

        }

        // Verificação da disponibilidade da data escolhida.
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        // Retorna um erro caso a data já tenha sido escolhida.
        if (findAppointmentInSameDate) {

            throw new AppError('This appointment is already booked!');

        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
