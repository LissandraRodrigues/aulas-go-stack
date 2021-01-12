import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

// Faz com que independentemente da rota (get, post, delete ...)
// o que for adicionado após o caminho (/appointments) seja add em appointmentsRouter.
// Com isso, cada rota não precisa digitar o caminho novamente.
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
