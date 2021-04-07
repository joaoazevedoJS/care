import { Router } from 'express';

import Authorization from '@domain/users/infra/http/middlewares/Authorization';

import usersRoutes from '@domain/users/infra/http/routes/users.routes';
import sessionsRoutes from '@domain/users/infra/http/routes/sessions.routes';
import doctorRoutes from '@domain/users/infra/http/routes/doctor.routes';
import servicesRoutes from '@domain/servicesProvider/infra/http/routes/services.routes';
import appointmentRoutes from '@domain/servicesProvider/infra/http/routes/appointments.routes';

import mailsRoutes from './mails.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);
routes.use('/mails', mailsRoutes);
routes.use('/services', servicesRoutes);

routes.use('/appointment', Authorization, appointmentRoutes);
routes.use('/admin/doctor', Authorization, doctorRoutes);

export default routes;
