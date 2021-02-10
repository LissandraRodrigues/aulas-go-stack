import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// Faz com que tenhamos o id do usuário em todas as rotas autenticadas.
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', celebrate({

    [Segments.BODY]: {

        provider_id: Joi.string().uuid().required(),
        date: Joi.date()

    }

}), appointmentsController.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
