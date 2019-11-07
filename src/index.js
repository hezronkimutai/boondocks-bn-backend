/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import router from './routes/index';
import ErrorHandler from './utils/error';
import logger from './utils/winston';

const isDevelopment = process.env.NODE_ENV;

const app = express();

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());

// used in testing heroku
app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to Barefoot Nomad'
}));

// to throw an error to the logger
app.get('/err', (req, res) => {
  throw new ErrorHandler('Errror here');
});

app.use(router);
app.use((req, res, next) => res.status(404).json({
  error: 'Not found'
}));

// development error handler middleware
app.use((err, req, res, next) => {
  if (isDevelopment !== 'development') {
    return next(err);
  }
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
    req.ip
  } - Stack: ${err.stack}`);

  return res.status(err.statusCode).json({
    message: err.message,
    info: 'check logs for more info'
  });
});

// Production and testing error handler middleware
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
    req.ip
  } - Stack: ${err.stack}`);

  return res.status(err.statusCode).json({
    message: err.message
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
