import express from 'express';
import {
  managersSignup,
  login,
  managerDelete,
  managersGet,
} from '../controllers/managersController';

const managersRouter = express.Router();

managersRouter.route('/signup').post(managersSignup);
managersRouter.route('/signin').post(login);
managersRouter.route('/:id').delete(managerDelete);
managersRouter.route('/').get(managersGet);

export default managersRouter;
