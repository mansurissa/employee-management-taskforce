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

export const login = async (req, res) => {
  try {
    await Managers;
  } catch (error) {
    console.log(error);
  }
};
