//import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {

    beforeEach(() => {

        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository, fakeCacheProvider);

    });

    it('should be able to list the appointments on a specific day', async () => {

        const appointment1 = await fakeAppointmentsRepository.create({

            provider_id: 'provider',
            user_id: "user",
            date: new Date(2021, 4, 21, 14, 0, 0),

        });

        const appointment2 = await fakeAppointmentsRepository.create({

            provider_id: 'provider',
            user_id: "user",
            date: new Date(2021, 4, 21, 15, 0, 0),

        });

        const appointments = await listProviderAppointmentsService.execute({

            provider_id: 'provider',
            year: 2021,
            month: 5,
            day: 21,

        });

        expect(appointments).toEqual([appointment1,appointment2]);

    });

});


