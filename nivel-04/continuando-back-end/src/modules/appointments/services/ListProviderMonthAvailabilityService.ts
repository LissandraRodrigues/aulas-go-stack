import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {

    provider_id: string;
    month: number;
    year: number;

}

type IResponse = Array <{

    day: number;
    available: boolean;

}>;

@injectable()
class ListProviderMonthAvailabilityService {

    constructor(

        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository

    ) {}

    public async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {

        const appointments = await this.appointmentsRepository.findAllInMonthProvider({

            provider_id,
            month,
            year

        });

        const numberOfDaysInMonth = getDaysInMonth(

            new Date(year, month - 1)

        );

        const eachDayArray = Array.from(

            { length: numberOfDaysInMonth },
            (_, index) => index + 1,

        );

        //const nowDate = Date.now();

        const availability = eachDayArray.map(day => {

            const compareDate = new Date(year, month - 1, day, 23, 59, 59);

            const appointmentsInDay = appointments.filter(appointment => {

                return getDate(appointment.date) === day;

            });

            const currentMonth = new Date().getMonth();

            return {

                day,
                available: isAfter(compareDate, currentMonth) && appointmentsInDay.length < 10,

            }

        });

        return availability;

    }
}

export default ListProviderMonthAvailabilityService;
