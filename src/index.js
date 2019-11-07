/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import router from './routes/index';

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());


if (!isProduction) {
  app.use(errorhandler());
}

// used in testing heroku
app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome to Barefoot Nomad'
}));

app.use(router);
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
