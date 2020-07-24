import express from 'express';
import { managersSignup, login } from '../controllers/managersController';

const managersRouter = express.Router();

managersRouter.route('/signup').post(managersSignup);
managersRouter.route('/sigin').put(login);

export default managersRouter;
