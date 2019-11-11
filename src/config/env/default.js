const config = {
  PORT: process.env.PORT || 3000,
  secret: process.env.SECRET,
  database: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  debug: false,
};

// Set the current environment or default to 'development'
config.env = process.env.NODE_ENV || 'development';

export default config;
