import Employees from '../models/employeesModel';
// import sendEmail from '../helpers/mail';

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
      image: req.image,
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
    const del = await Employees.findById(req.params._id).delete();
    res.status(201).json({
      success: true,
      message: 'User deleted successfully',
      data: del,
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
    await Employees.findById(req.params._id).update({ ...req.body });
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

export const employeeActivate = async (req, res) => {
  const id = req.params._id;
  try {
    await Employees.findOneAndUpdate({ _id: id }, { status: req.body.status });
    res.status(200).json({
      message: 'activated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'activation failed',
      error,
    });
  }
};

export const employeeSuspend = async (req, res) => {
  try {
    await Employees.findOneAndUpdate(
      { _id: req.params._id },
      { suspended: req.body.suspended }
    );
    if (req.body.suspended === true) {
      res.status(201).json({
        message: ' employee suspended',
      });
    } else if (req.body.suspended === false) {
      res.status(201).json({
        message: ' employee is back',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

export const employeeSearch = async (req, res) => {
  try {
    const [keys] = Object.keys(req.body);
    const [values] = Object.values(req.body);
    const result = await Employees.find({
      [keys]: { $regex: values },
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};
