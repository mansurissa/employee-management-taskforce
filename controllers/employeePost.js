import mongoose from 'mongoose';
import Employee from '../models/employeesModel';

export const employeePost = async (req, res) => {
  try {
    const employee = await Employee.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      status: req.body.status,
      position: req.body.position,
      birth: req.body.birth,
      nId: req.body.nId
    });
    res.status(201).json({
      message: ' user created successfully',
      employee
    });
  } catch (err) {
    console.log('failed to write employee', err);
    res.status(500).json({
      error: err
    });
  }
};
