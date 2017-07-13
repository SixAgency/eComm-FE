import winston from 'winston';

winston.emitErrs = true;

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      name: 'debug',
      level: 'debug',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      colorize: true,
      json: false
    })
  ],
  exitOnError: false
});

export default logger;
