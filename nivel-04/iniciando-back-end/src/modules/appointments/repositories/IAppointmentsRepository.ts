import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppoinmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {

    create(data: ICreateAppoinmentDTO): Promise<Appointment>;

    findByDate(date: Date): Promise<Appointment | undefined>

}
