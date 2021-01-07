import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// Faz com que tenhamos o id do usuário em todas as rotas autenticadas.
appointmentsRouter.use(ensureAuthenticated);

//appointmentsRouter.get('/', async (request, response) => {
  //  const appointments = await appointmentsRepository.find();

 //   return response.json(appointments);
//});

appointmentsRouter.post('/', async (request, response) => {
    // Provider é o nome do barbeiro/cabelereiro.
    const { provider_id, date } = request.body;

    // Formatação da data/hora.
    const parsedDate = parseISO(date);

    const appointmentsRepository = new AppointmentsRepository();
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = await createAppointment.execute({
        provider_id,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
