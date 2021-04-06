import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@configs/upload';

import Authorization from '../middlewares/Authorization';

import UsersController from '../controllers/UsersController';
import AvatarUserController from '../controllers/AvatarUserController';
import ConfirmationCodeController from '../controllers/ConfirmationCodeController';

const usersRoutes = Router();
const usersController = new UsersController();
const avatarUserController = new AvatarUserController();
const confirmationCodeController = new ConfirmationCodeController();

const upload = multer(uploadConfig);

usersRoutes.post('/signup', usersController.create);

usersRoutes.patch(
  '/avatar',
  Authorization,
  upload.single('avatar'),
  avatarUserController.update,
);

usersRoutes.patch(
  '/authenticated',
  Authorization,
  confirmationCodeController.update,
);

export default usersRoutes;
