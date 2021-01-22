//import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {

    beforeEach(() => {

        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);

    });

    it('should be able to list the month availability from provider', async () => {

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 8, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 9, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 10, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 11, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 12, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 13, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 14, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 15, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 16, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 21, 17, 0, 0),

        });

        await fakeAppointmentsRepository.create({

            provider_id: 'user',
            date: new Date(2021, 4, 22, 8, 0, 0),

        });

        const availability = await listProviderMonthAvailabilityService.execute({

            provider_id: 'user',
            year: 2021,
            month: 5,

        });

        expect(availability).toEqual(
            expect.arrayContaining([

            { day: 19, available: true },
            { day: 20, available: true },
            { day: 21, available: false },
            { day: 22, available: true },

        ]));

    });

});


