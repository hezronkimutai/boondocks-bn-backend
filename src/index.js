import app from './app';
import logger from './utils/winston';
import config from './config';

app.set('port', config.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  logger.info(`Express running → PORT ${server.address().port}`);
});

// Gracefull shut downs
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing http server.');
  server.close(() => {
    logger.info('Http server closed.');
  });
});
