import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();
const { EMAIL, PASS, JWT_KEY, PORT } = process.env;

const sendEmail = async (type, data = {}) => {
  try {
    const token = jwt.sign(data, JWT_KEY, { expiresIn: '1h' });
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: EMAIL, // generated ethereal user
        pass: PASS, // generated ethereal password
      },
    });
    const mail = {
      from: '"From superManager" <employeesManagement@example.com>', // sender address
      to: `${data.email}`, // list of receivers
      subject: `${type}`, // Subject line
    };

    switch (type) {
      case 'comfirmation':
        mail.html = '<b>Welcome to Nettrip</b>';
        break;
      case 'verify':
        mail.html = `<b>verify your email</b> <a href='http://localhost:${PORT}/managers/verify/${token}'>click here to verify</a>`;
        break;
      default:
        mail.html = '<p>ntago ari sawa</p>';
    }

    const info = await transporter.sendMail(mail);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
