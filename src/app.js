import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import router from './routes/index';
import logger from './utils/winston';
import Responses from './utils/response';
import config from './config';

const isDevelopment = config.env;

const app = express();

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());

// used in testing heroku
app.get('/', (req, res) => Responses.handleSuccess(200, 'Welcome to Barefoot Nomad', res));

app.use(router);
app.use((req, res) => Responses.handleError(404, 'Not found', res));

// development error handler middleware
app.use((err, req, res, next) => {
  if (isDevelopment !== 'development') {
    return next(err);
  }
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
    req.ip
  } - Stack: ${err.stack}`);

  return Responses.handleError(err.statusCode, `${err.message} - check logs for more info`, res);
});

// Production and testing error handler middleware
app.use((err, req, res) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
    req.ip
  } - Stack: ${err.stack}`);

  return Responses.handleError(err.statusCode, err.message, res);
});

export default app;
