import mongoose from 'mongoose';
import Employees from '../models/employeesModel';
import sendEmail from '../helpers/mail';

export const employeePost = async (req, res) => {
  try {
    const employee = await Employees.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      status: req.body.status,
      position: req.body.position,
      birth: req.body.birth,
      nId: req.body.nId,
    });
    res.status(201).json({
      message: ' user created successfully',
      employee,
    });
  } catch (err) {
    console.log('failed to write employee', err);
    res.status(500).json({
      error: err,
    });
  }
};

export const employeesGet = async (req, res) => {
  try {
    const employees = await Employees.find();

    res.status(200).json({
      message: ' employees fetched',
      employees,
    });
  } catch (error) {
    console.log('Big Error: ', error);
    res.status(500).json({
      message: ' failed to fetch all employees',
      error,
    });
  }
};

export const employeeDelete = async (req, res) => {
  try {
    await Employees.findById(req.params._id).deleteOne();
    res.status(201).json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'failed to delete a user',
    });
  }
};

export const employeeUpdate = async (req, res) => {
  try {
    await Employees.findById(req.params._id).updateOne({ ...req.body });
    res.status(201).json({
      message: 'user info updated ',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'update failed',
      error,
    });
  }
};
