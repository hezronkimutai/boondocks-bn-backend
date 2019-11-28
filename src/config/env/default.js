const dotenv = require('dotenv');

dotenv.config();
const config = {
  PORT: process.env.PORT || 3000,
  secret: process.env.SECRET,
  database: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  googleConfig: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback'
  },
  facebookConfig: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/facebook/callback'
  },
  HASH_SALT_ROUNDS: 10,
  debug: false,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  env: process.env.NODE_ENV || 'development'
};

module.exports = config;
