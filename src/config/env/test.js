const config = {
  database: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  debug: true,
};

export default config;
