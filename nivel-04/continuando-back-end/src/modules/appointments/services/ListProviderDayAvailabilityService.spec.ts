//import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {

    beforeEach(() => {

        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);

    });

    it('should be able to list the day availability from provider', async () => {

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 8, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 10, 0, 0),

        });

        const availability = await listProviderDayAvailabilityService.execute({

            provider_id: 'user',
            day: 21,
            month: 5,
            year: 2021

        });

        expect(availability).toEqual(
            expect.arrayContaining([

                { hour: 8, available: false },
                { hour: 9, available: true },
                { hour: 10, available: false },
                { hour: 11, available: true },

            ]),
        );

    });

});


