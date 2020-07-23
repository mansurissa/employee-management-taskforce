import Managers from '../models/loginModel';

const managersSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const manager = await Managers.create({
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: ' manager created',
      manager,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: ' manager was not created',
      error,
    });
  }
};
export default managersSignup;
