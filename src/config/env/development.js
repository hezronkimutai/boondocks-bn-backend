const config = {
  database: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  debug: true,
};

export default config;
