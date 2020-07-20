import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import employeesRouter from './router/employeeRouter';
import mongoose from 'mongoose';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log('ndaryoshye'));

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/employees', employeesRouter);

app.use((req, res, next) => {
  const error = new error('Not found');
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
