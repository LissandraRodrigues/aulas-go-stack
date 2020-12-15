import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// DTO -> Data Transfer Object

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }

    public findByDate(date: Date): Appointment | null {
        // Verifica se o horário está de fato vago. Retorna true ou false.
        const findAppointment = this.appointments.find(appointment =>
            // Verifica se o parsedDate é igual a algum horário já cadastrado.
            isEqual(date, appointment.date),
        );

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
