import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {

    public async create(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id;

        // Provider é o nome do barbeiro/cabelereiro.
        const { provider_id, date } = request.body;

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            provider_id,
            user_id,
            date,
        });

        return response.json(appointment);

    }


}