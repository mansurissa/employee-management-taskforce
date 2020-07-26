import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Managers from '../models/managersModel';

export const managersSignup = async (req, res) => {
  const { email, password, dateOfBirth, phone, nId, name } = req.body;
  try {
    await bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: 'auth failed',
        });
      }
      const data = await Managers.create({
        name,
        email,
        password: hash,
        dateOfBirth,
        phone,
        nId,
        image: req.image,
      });
      res.status(201).json({
        success: true,
        message: ' manager created',
        manager: data,
      });
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
      success: true,
      got: `${manager.length} regestered managers`,
      message: 'successfully get managers',
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
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'failed in logining in',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: data[0].email,
              managerId: data[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h',
            }
          );
          console.log(token);
          res.status(200).json({
            success: true,
            message: 'successfully loged in and authorized',
            data: {
              manager: data[0],
              token,
            },
          });
        }
      });
    } else {
      res.status(404).json('not found in managers');
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
