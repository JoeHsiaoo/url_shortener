import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import router from './routes/index.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(router);

app.use(function (req, res, next) {
  next(createError(404));
});

export default app;
