import Employees from '../models/employeesModel';
import ErrorResponse from '../helpers/errorResponse';
import sendEmail from '../helpers/mail';

const yearsValidator = (birthday) => {
  const year = birthday.split('/')[2];
  const todayTime = new Date();
  return todayTime.getFullYear() - parseInt(year, 10);
};

export const employeePost = async (req, res) => {
  try {
    const { name, email, phone, birth, nId } = req.body;
    if (!name || !email || !phone || !birth || !nId) {
      throw new ErrorResponse('some fields are not filled', 400);
    }

    if (yearsValidator(req.body.birth) < 18) {
      throw new ErrorResponse('uzakura sha ndagukoje', 400);
    }

    const employee = await Employees.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      status: req.body.status,
      position: req.body.position,
      birth: req.body.birth,
      nId: req.body.nId,
    });
    sendEmail(`Comfirmation`, {
      email,
    });
    return res.status(201).json({
      success: true,
      message: ' user created successfully',
      data: employee,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      error: err.message,
      data: {},
    });
  }
};

export const employeesGet = async (req, res) => {
  try {
    const employees = await Employees.find();

    res.status(200).json({
      success: true,
      message: ' employees fetched',
      data: {
        count: employees.length,
        employees,
      },
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
    const del = await Employees.findOne({ _id: req.params._id });
    if (!del)
      return res.status(404).json({
        success: false,
        message: 'employee not fount',
        data: {},
      });
    await del.deleteOne();
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: del,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'failed to delete a user',
    });
  }
};
export const getOneEmployee = async (req, res) => {
  try {
    const found = await Employees.findById(req.params._id);
    res.status(200).json({
      success: true,
      message: 'fetched succefully',
      data: found,
    });
  } catch (error) {
    console.log(error);
  }
};

export const employeeUpdate = async (req, res) => {
  try {
    const employeeUpdated = await Employees.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json({
      success: true,
      message: 'user info updated',
      data: {
        employee: employeeUpdated,
      },
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
      success: true,
      message: 'activated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
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
        success: true,
        message: ' employee suspended',
      });
    } else if (req.body.suspended === false) {
      res.status(500).json({
        success: false,
        message: 'employee is back',
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

    res.status(200).json({
      success: true,
      found: `${result.length} matches with '${values}'`,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

export const saveEmployees = async (req, res) => {
  try {
    const employee = req.employeeList;
    employee.map((data) => {
      const received = Employees.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        status: data.status,
        position: data.position,
        birth: data.birth,
        nId: data.nId,
      });
      return received;
    });
    res.status(201).json({
      success: true,
      message: ' users created successfully',
      data: employee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};
export const employeeImage = async (req, res) => {
  try {
    await Employees.findById(req.params._id).update({ image: req.image });
    res.status(200).json({
      success: true,
      message: 'image added successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "employee's image not sent",
    });
  }
};
