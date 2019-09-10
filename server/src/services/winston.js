import { createLogger, transports } from 'winston';
import { existsSync, mkdirSync } from 'fs';

if (!existsSync('logs')) {
  mkdirSync('logs');
}

export default createLogger({
  transports: [
    new transports.Console({
      level: process.env.logger,
      colorize: true,
    }),
    new transports.File({
      level: process.env.logger,
      filename: 'logs/logs.log',
      maxsize: 100000,
      maxFiles: 10,
    }),
  ],
});
