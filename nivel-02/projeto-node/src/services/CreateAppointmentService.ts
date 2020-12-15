import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        // Verificação da disponibilidade da data escolhida.
        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        // Retorna um erro caso a data já tenha sido escolhida.
        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked!');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
