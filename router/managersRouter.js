import express from 'express';
import managersSignup from '../controllers/managersController';

const managersRouter = express.Router();

managersRouter.route('/').post(managersSignup);

export default managersRouter;
