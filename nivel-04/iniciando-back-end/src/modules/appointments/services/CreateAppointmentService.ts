import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';;

interface IRequest {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {

    constructor(

        private appointmentsRepository: IAppointmentsRepository,

    ) {}

    public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

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
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
