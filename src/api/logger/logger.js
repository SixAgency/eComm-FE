import winston from 'winston';
import path from 'path';

function getDebugFileName() {
  if (process.env.NODE_ENV !== 'production') {
    return path.resolve(__dirname, '../logs/debug.log');
  }
  return '/app/eComm_frontend/logs/debug.log';
}

function getInfoFileName() {
  if (process.env.NODE_ENV !== 'production') {
    return path.resolve(__dirname, '../logs/info.log');
  }
  return '/app/eComm_frontend/logs/info.log';
}

function getErrorFileName() {
  console.log(path.resolve(__dirname, '../logs/error.log'));
  if (process.env.NODE_ENV !== 'production') {
    return path.resolve(__dirname, '../logs/error.log');
  }
  return '/app/eComm_frontend/logs/error.log';
}

winston.emitErrs = true;

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'info',
      filename: getInfoFileName(),
      level: 'info',
      handleExceptions: true,
      colorize: true,
      json: false
    }),
    new winston.transports.File({
      name: 'debug',
      filename: getDebugFileName(),
      level: 'debug',
      handleExceptions: true,
      colorize: true,
      json: false
    }),
    new winston.transports.File({
      name: 'error',
      filename: getErrorFileName(),
      level: 'error',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      colorize: true,
      json: false
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message.trim());
  }
};

export default logger;
