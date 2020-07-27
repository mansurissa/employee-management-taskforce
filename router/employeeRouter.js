import express from 'express';
import fileUploader from '../middlewares/fileUploader';
import auth from '../middlewares/checkAuth';

import {
  employeePost,
  employeesGet,
  employeeDelete,
  employeeUpdate,
  employeeActivate,
  employeeSuspend,
  employeeSearch,
  saveEmployees,
} from '../controllers/employeeController';
import { readExcel, uploadExcel } from '../helpers/excel';

const employeesRouter = express.Router();

employeesRouter
  .route('/')
  .post(auth, fileUploader, employeePost)
  .get(employeesGet);
employeesRouter.route('/many').post(uploadExcel, readExcel, saveEmployees);
employeesRouter
  .route('/:_id')
  .delete(auth, employeeDelete)
  .put(auth, employeeUpdate);
employeesRouter.route('/:_id/activate').put(auth, employeeActivate);
employeesRouter.route('/:_id/suspend').put(auth, employeeSuspend);
employeesRouter.route('/search').post(auth, employeeSearch);

export default employeesRouter;
