import express, { json } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import employeesRouter from './router/employeeRouter';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(console.log('ndaryoshye bwa 2'));

const app = express();

app.use(helmet());
app.use(json());
app.use(morgan('dev'));
app.use(cors());

app.use('/employees', employeesRouter);

app.use((req, res, next) => {
  const error = new Error('Not found ');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.json({
    error
  });
});

const port = process.env.PORT;
app.listen(port, console.log(`listening on ${port}`));
