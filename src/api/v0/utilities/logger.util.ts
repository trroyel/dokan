import { createLogger, format, transports } from 'winston'

import { nodeEnv } from '../configs'

const { combine, timestamp, printf, colorize } = format;
const level = () => nodeEnv === 'development' ? 'debug' : 'warn';

const customFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(
    ({ level, message, timestamp }) => `[${level}]-${timestamp} : ${message}`
  )
);

const Logger = createLogger({
  level: level(),
  format: combine(timestamp(), format.json()),
  transports: [
    new transports.File({ filename: 'logs/all.log' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  Logger.add(new transports.Console({
    format: customFormat,
    level: level()
  }));
}

export { Logger }