// eslint-disable-next-line import/no-unresolved
import { createLogger, format, transports } from 'winston';


const { combine, timestamp, prettyPrint } = format;
const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: '.logs/error.log', level: 'error' }),
    new transports.File({ filename: './logs/info.log', level: 'info' }),
  ],
  exitOnError: false,
});

export default logger;
