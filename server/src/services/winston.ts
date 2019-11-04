import { existsSync, mkdirSync } from 'fs'
import { createLogger, transports } from 'winston'

if (!existsSync('logs')) {
  mkdirSync('logs')
}

export default createLogger({
  transports: [
    new transports.Console({
      level: process.env.logger,
    }),
    new transports.File({
      filename: 'logs/logs.log',
      level: process.env.logger,
      maxFiles: 10,
      maxsize: 100000,
    }),
  ],
})
