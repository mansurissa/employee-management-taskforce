import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();
const { EMAIL, PASS } = process.env;

const sendEmail = async (type) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL, // generated ethereal user
        pass: PASS, // generated ethereal password
      },
    });
    const mail = {
      from: '"Fred Foo 👻" <employeesManagement@example.com>', // sender address
      to: 'wqz85747@eoopy.com', // list of receivers
      subject: 'Hello ✔', // Subject line
    };

    switch (type) {
      case 'comfirmation':
        mail.html = '<b>Welcome to Nettrip</b>';
        break;
      case 'verfication':
        mail.html = '<b>verify your email</b>';
        break;
      default:
        mail.html = '<p>ntgo ari sawa</p>';
    }

    const info = await transporter.sendMail(mail);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
