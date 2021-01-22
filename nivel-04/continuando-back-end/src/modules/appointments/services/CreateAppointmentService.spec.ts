// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {

    beforeEach(() => {

        fakeAppointmentRepository = new FakeAppointmentRepository();

        createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

    });

    it('should be able to create a new appointment', async () => {

        const appointment = await createAppointment.execute({

            date: new Date(),
            user_id: "123456",
            provider_id: "1233333333"

        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1233333333');

    })

    it('should not to be able to create two appointments on the same time', async () => {

        const appointmentDate = new Date(2021, 0, 8, 20);

        await createAppointment.execute({

            date: appointmentDate,
            user_id: "123456",
            provider_id: "1233333333"

        });

        expect(createAppointment.execute({

            date: appointmentDate,
            user_id: "123456",
            provider_id: "1233333333"

        })).rejects.toBeInstanceOf(AppError);

    })
});


