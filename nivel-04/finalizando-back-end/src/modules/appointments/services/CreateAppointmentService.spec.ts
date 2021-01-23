// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;

let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {

    beforeEach(() => {

        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();

        createAppointment = new CreateAppointmentService(fakeAppointmentRepository, fakeNotificationsRepository);

    });

    it('should be able to create a new appointment', async () => {

        jest.spyOn(Date, "now").mockImplementationOnce(() => {

            return new Date(2021, 0, 10, 12).getTime();

        });

        const appointment = await createAppointment.execute({

            date: new Date(2021, 0, 10, 13),
            user_id: "user_id",
            provider_id: "provider-id"

        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider-id');

    });

    it('should not to be able to create two appointments on the same time', async () => {

        const appointmentDate = new Date(2021, 5, 8, 11);

        await createAppointment.execute({

            date: appointmentDate,
            user_id: "user-id",
            provider_id: "provider-id"

        });

        await expect(createAppointment.execute({

            date: appointmentDate,
            user_id: "user-id",
            provider_id: "provider-id"

        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to create an appointment on a past date', async () => {

        jest.spyOn(Date, "now").mockImplementationOnce(() => {

            return new Date(2021, 0, 10, 12).getTime();

        });

        await expect(createAppointment.execute({

            date: new Date(2020, 11, 15, 12),
            user_id: "user_id",
            provider_id: "provider_id"

        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to create an appointment with same user as provider', async () => {

        jest.spyOn(Date, "now").mockImplementationOnce(() => {

            return new Date(2021, 0, 10, 12).getTime();

        });

        await expect(createAppointment.execute({

            date: new Date(2020, 11, 15, 13),
            user_id: "user_id",
            provider_id: "user_id"

        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to create an appointment before 8am and after 5pm', async () => {

        jest.spyOn(Date, "now").mockImplementationOnce(() => {

            return new Date(2021, 0, 10, 12).getTime();

        });

        await expect(createAppointment.execute({

            date: new Date(2020, 11, 11, 7),
            user_id: "user_id",
            provider_id: "provider_id"

        })).rejects.toBeInstanceOf(AppError);

        await expect(createAppointment.execute({

            date: new Date(2020, 11, 11, 18),
            user_id: "user_id",
            provider_id: "provider_id"

        })).rejects.toBeInstanceOf(AppError);

    });

});


