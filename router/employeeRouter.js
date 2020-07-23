import express from 'express';
import {
  employeePost,
  employeesGet,
  employeeDelete,
  employeeUpdate,
  employeeActivate,
  employeeSuspend,
} from '../controllers/employeeController';

const employeesRouter = express.Router();

employeesRouter.route('/').post(employeePost).get(employeesGet);
employeesRouter.route('/:_id').delete(employeeDelete).put(employeeUpdate);
employeesRouter.route('/:_id/activate').put(employeeActivate);
employeesRouter.route('/:_id/suspend').put(employeeSuspend);

export default employeesRouter;
