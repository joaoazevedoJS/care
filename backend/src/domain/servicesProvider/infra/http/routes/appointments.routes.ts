import { Router } from 'express';

import AppointmentController from '../controller/AppointmentController';
import ContractServiceController from '../controller/ContractServiceController';
import StatusClosedController from '../controller/StatusClosedController';
import StatusOpeningController from '../controller/StatusOpeningController';
import StatusProgressController from '../controller/StatusProgressController';

const appointmentRoutes = Router();

const appointmentController = new AppointmentController();
const statusOpeningController = new StatusOpeningController();
const statusProgressController = new StatusProgressController();
const statusClosedController = new StatusClosedController();
const contractServiceController = new ContractServiceController();

appointmentRoutes.get('/:service_id', appointmentController.index);
appointmentRoutes.get('/resume/:appointment_id', appointmentController.show);
appointmentRoutes.post('/:service_id', appointmentController.create);

appointmentRoutes.patch(
  '/contract/:appointment_id',
  contractServiceController.update,
);

appointmentRoutes.get('/:service_id/openings', statusOpeningController.index);
appointmentRoutes.get('/:service_id/progress', statusProgressController.index);
appointmentRoutes.get('/:service_id/closeds', statusClosedController.index);

appointmentRoutes.put(
  '/:appointment_id/progress',
  statusProgressController.update,
);

appointmentRoutes.put(
  '/:appointment_id/progress/cancel',
  statusOpeningController.update,
);

appointmentRoutes.put('/:appointment_id/closed', statusClosedController.update);

export default appointmentRoutes;
