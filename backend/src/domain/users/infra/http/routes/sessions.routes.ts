import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import Authorization from '../middlewares/Authorization';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post('/signin', sessionsController.create);
sessionsRoutes.get('/user', Authorization, sessionsController.show);

export default sessionsRoutes;
