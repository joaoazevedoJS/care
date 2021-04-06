import { Router } from 'express';

import DoctorController from '../controllers/DoctorController';

const doctorRoutes = Router();

const doctorController = new DoctorController();

doctorRoutes.post('/signup', doctorController.create);

export default doctorRoutes;
