import express from 'express';
import fileUploader from '../middlewares/fileUploader';
import checkAuth from '../middlewares/checkAuth';

import {
  employeePost,
  employeesGet,
  employeeDelete,
  employeeUpdate,
  employeeActivate,
  employeeSuspend,
  employeeSearch,
} from '../controllers/employeeController';

const employeesRouter = express.Router();

employeesRouter
  .route('/')
  .post(checkAuth, fileUploader, employeePost)
  .get(employeesGet);
employeesRouter
  .route('/:_id')
  .delete(checkAuth, employeeDelete)
  .put(checkAuth, employeeUpdate);
employeesRouter.route('/:_id/activate').put(checkAuth, employeeActivate);
employeesRouter.route('/:_id/suspend').put(checkAuth, employeeSuspend);
employeesRouter.route('/search').post(checkAuth, employeeSearch);

export default employeesRouter;
