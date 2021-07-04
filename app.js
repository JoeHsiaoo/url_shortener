import express from 'express';
import logger from 'morgan';
import rateLimit from 'express-rate-limit';

import router from './routes/index.js';
import rateLimitConfig from './configs/rateLimit.js';

const app = express();

app.use(rateLimit(rateLimitConfig));
app.use(logger('dev'));
app.use(express.json());

app.use(router);

app.use(function (req, res) {
  return res.status(404).send('Not found');
});

export default app;
