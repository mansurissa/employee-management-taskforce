import express from 'express';
import { employeePost, employeesGet } from '../controllers/employeeController';

const employeesRouter = express.Router();

employeesRouter.route('/').post(employeePost).get(employeesGet);
// employeesRouter.route('/:_id').delete(employeeDelete)

export default employeesRouter;
