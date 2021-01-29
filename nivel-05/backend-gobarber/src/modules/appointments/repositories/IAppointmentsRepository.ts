import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppoinmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayProviderDTO';

export default interface IAppointmentsRepository {

    create(data: ICreateAppoinmentDTO): Promise<Appointment>;

    findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;

    findAllInMonthProvider(data: IFindAllInMonthProviderDTO): Promise<Appointment[]>;

    findAllInDayProvider(data: IFindAllInDayProviderDTO): Promise<Appointment[]>;

}
