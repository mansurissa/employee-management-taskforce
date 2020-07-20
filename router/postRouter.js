import express from 'express';

const postRouter = express.Router();

postRouter.route('/', 'post', (req, res) => {
  res.json(console.log('it works'));
});

export default postRouter;
