import express from 'express';
import auth from '../middlewares/checkAuth';
import fileUploader from '../middlewares/fileUploader';
import {
  managersSignup,
  login,
  managerDelete,
  managersGet,
} from '../controllers/managersController';

const managersRouter = express.Router();

managersRouter.route('/signup').post(fileUploader, managersSignup);
managersRouter.route('/signin').post(login);
managersRouter.route('/:id').delete(auth, managerDelete);
managersRouter.route('/').get(auth, managersGet);

export default managersRouter;
