import bcrypt from 'bcrypt';
// import { json } from 'express';
import Managers from '../models/managersModel';

export const managersSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    await bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: 'auth failed',
        });
      } else {
        console.log(hash);
        const manager = Managers.create({
          email,
          password: hash,
        });
        res.status(201).json({
          success: true,
          message: ' manager created',
          manager,
        });
      }
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: ' manager was not created',
      error,
    });
  }
};
export const managersGet = async (req, res) => {
  try {
    const manager = await Managers.find();
    res.status(200).json({
      message: 'success',
      manager,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'failed to get all managers',
    });
  }
};

export const login = async (req, res) => {
  try {
    const data = await Managers.find({ email: req.body.email });
    if (data.length > 1) {
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'failed in logining in',
          });
        }
        if (result) {
          res.status(200).json({
            message: 'successfully loged in',
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const managerDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await Managers.findOneAndDelete({ _id: id });
    res.status(201).json({
      success: true,
      message: 'deleted successfully',
      data: del,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'failed to delete ',
    });
  }
};
