import express from 'express';
import {
  employeePost,
  employeesGet,
  employeeDelete,
  employeeUpdate,
} from '../controllers/employeeController';

const employeesRouter = express.Router();

employeesRouter.route('/').post(employeePost).get(employeesGet);
employeesRouter.route('/:_id').delete(employeeDelete).put(employeeUpdate);

export default employeesRouter;
