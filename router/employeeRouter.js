import express from 'express';
import { employeePost } from '../controllers/employeePost';

const employeesRouter = express.Router();

employeesRouter.route('/').post(employeePost);

export default employeesRouter;
