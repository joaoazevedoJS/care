import { Router } from 'express';

import AppointmentController from '../controller/AppointmentController';

const appointmentRoutes = Router();

const appointmentController = new AppointmentController();

appointmentRoutes.get('/', appointmentController.index);
appointmentRoutes.post('/', appointmentController.create);

export default appointmentRoutes;
