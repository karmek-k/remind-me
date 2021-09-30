import winston from 'winston';

class LoggerService {
  private logger: winston.Logger;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';
    const transports: winston.transport[] = [
      new winston.transports.Console({ format: winston.format.simple() })
    ];

    if (isProduction) {
      transports.push(new winston.transports.File({ filename: 'logs.log' }));
    }

    this.logger = winston.createLogger({
      level: isProduction ? 'info' : 'verbose',
      transports
    });
  }

  log(msg: any, level: string = 'info') {
    this.logger.log(level, msg);
  }
}

export const loggerService = new LoggerService();
