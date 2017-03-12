import winston from 'winston';
import path from 'path';

winston.emitErrs = true;

let logFile = '/app/eComm_frontend/logs/all.log';
if (process.env.NODE_ENV != 'production') {
  logFile = path.resolve(__dirname, '../logs/all.log');
}
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      name: 'info',
      level: 'info',
      handleExceptions: true,
      colorize: true,
      json: false
    }),
    new winston.transports.Console({
      name: 'error',
      level: 'error',
      handleExceptions: true,
      colorize: true,
      json: true
    }),
    new winston.transports.File({
      name: 'file-info',
      filename: logFile,
      level: 'info',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false
    }),
  ],
  exitOnError: false
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message.trim());
  }
};

export default logger;
