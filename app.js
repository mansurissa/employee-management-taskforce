import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import postRouter from './router/postRouter';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/post', postRouter);

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
