import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@configs/upload';

import Authorization from '@domain/users/infra/http/middlewares/Authorization';

import ServiceController from '../controller/ServiceController';
import UpdateImageController from '../controller/UpdateImageController';
import ContractServiceController from '../controller/ContractServiceController';
import ImportCSVServiceController from '../controller/ImportCSVServiceController';

const servicesRoutes = Router();

const upload = multer(uploadConfig);

const serviceController = new ServiceController();
const updateImageController = new UpdateImageController();
const contractServiceController = new ContractServiceController();
const importCSVServiceController = new ImportCSVServiceController();

servicesRoutes.post(
  '/',
  Authorization,
  upload.single('image'),
  serviceController.create,
);

servicesRoutes.get('/', serviceController.index);

servicesRoutes.patch(
  '/:service_id/image',
  Authorization,
  upload.single('image'),
  updateImageController.update,
);

servicesRoutes.put(
  '/contract/:appointment_id',
  contractServiceController.update,
);

servicesRoutes.post(
  '/csv',
  upload.single('services'),
  Authorization,
  importCSVServiceController.create,
);

export default servicesRoutes;
