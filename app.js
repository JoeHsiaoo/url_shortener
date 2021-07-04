import express from 'express';
import logger from 'morgan';
import router from './routes/index.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(router);

app.use(function (req, res) {
  return res.status(404).send('Not found');
});

export default app;
