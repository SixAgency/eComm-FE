import winston from 'winston';
import path from 'path';

winston.emitErrs = true;

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
      name: 'debug',
      level: 'debug',
      handleExceptions: true,
      colorize: true,
      json: false
    }),
    new winston.transports.Console({
      name: 'error',
      level: 'error',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      colorize: true,
      json: false
    })
  ],
  exitOnError: false
});

export default logger;