import winston from 'winston';

class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'verbose', // TODO: change when deploying
      transports: [
        new winston.transports.Console({ format: winston.format.simple() })
      ]
    });
  }

  log(msg: any, level: string = 'info') {
    this.logger.log(level, msg);
  }
}

export const loggerService = new LoggerService();
