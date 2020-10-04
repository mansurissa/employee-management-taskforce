import '@babel/polyfill';
import express, { json } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import managersRouter from './router/managersRouter';
import employeesRouter from './router/employeeRouter';

dotenv.config();

const { MONGO_URL, MONGO_URL_TEST, NODE_ENV } = process.env;
mongoose
  .connect(NODE_ENV === 'test' ? MONGO_URL_TEST : MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('connected to DB'));

const app = express();
app.use(
  fileUpload({
    limits: { fileSize: 2 * 1024 * 1024 },
    useTempFiles: true,
  })
);

app.use(helmet());
app.use(json());
app.use(morgan('dev'));
app.use(cors());

app.use('/employees', employeesRouter);
app.use('/managers', managersRouter);
app.use((req, res, next) => {
  const error = new Error('Not found ');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.json({
    error,
  });
});

const port = process.env.PORT;
app.listen(port || 4002, console.log(`listening on ${port}`));

export default app;
