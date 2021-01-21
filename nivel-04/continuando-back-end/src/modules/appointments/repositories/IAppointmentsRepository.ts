import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppoinmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO';

export default interface IAppointmentsRepository {

    create(data: ICreateAppoinmentDTO): Promise<Appointment>;

    findByDate(date: Date): Promise<Appointment | undefined>;

    findAllInMonthProvider(data: IFindAllInMonthProviderDTO): Promise<Appointment[]>;

}
