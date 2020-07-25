import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import {
  managersSignup,
  login,
  managerDelete,
  managersGet,
} from '../controllers/managersController';

const managersRouter = express.Router();

managersRouter.route('/signup').post(managersSignup);
managersRouter.route('/signin').post(login);
managersRouter.route('/:id').delete(checkAuth, managerDelete);
managersRouter.route('/').get(checkAuth, managersGet);

export default managersRouter;
