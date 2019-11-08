// configures the database urls according to the environment
import config from '../config';

module.exports = {
  url: config.database.url,
  dialect: 'postgress',
};
