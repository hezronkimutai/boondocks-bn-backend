/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import merge from 'lodash.merge';
import dotenv from 'dotenv';
import config from './env/default';


if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
  let localConfig = {};

  try {
    // The environment file might not exist
    localConfig = require(`./env/${config.env}`).default;
    localConfig = localConfig || {};
  } catch (err) {
    localConfig = {};
  }
  // merge the config files
  // localConfig will override defaults
  merge(config, localConfig);
}

export default config;
