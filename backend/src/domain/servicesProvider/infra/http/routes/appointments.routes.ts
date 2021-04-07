import { Router } from 'express';

import AppointmentController from '../controller/AppointmentController';
import ContractServiceController from '../controller/ContractServiceController';

const appointmentRoutes = Router();

const appointmentController = new AppointmentController();
const contractServiceController = new ContractServiceController();

appointmentRoutes.get('/:service_id', appointmentController.index);
appointmentRoutes.post('/:service_id', appointmentController.create);

appointmentRoutes.patch(
  '/contract/:appointment_id',
  contractServiceController.update,
);

export default appointmentRoutes;
