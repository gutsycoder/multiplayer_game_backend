const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} [${level}] - ${message}\n${stack || ''}`;
        })
    ),
    transports: [
        new winston.transports.File({
            filename: 'errors.log',
        }),
    ],
});

module.exports = logger;
