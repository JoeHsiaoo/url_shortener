import express from 'express';
import {body, param} from 'express-validator';
import reqValidationMiddleware from '../middlewares/reqValidation.js';
import urlController from '../controllers/url.js';

const router = express.Router();

router.get(
  '/:urlId',
  param('urlId').isAlphanumeric(),
  reqValidationMiddleware,
  urlController.getUrl,
);

router.post(
  '/api/v1/urls',
  body('url').isURL(),
  body(
    'expireAt',
    'expireAt must be ISO8601 form and greater than current time',
  )
    .isISO8601()
    .custom(value => new Date(value).getTime() > Date.now()),
  reqValidationMiddleware,
  urlController.createUrl,
);

export default router;
