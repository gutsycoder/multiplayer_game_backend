const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.File({
            filename: 'errors.log',
            timestamp: true,
        }),
    ],
});

module.exports = logger;