import Queue, { Job } from 'bull';
import { Reminder } from '../models/Reminder';

class QueueService {
  private queue: Queue.Queue;

  constructor() {
    const { REDIS_URL } = process.env;

    if (!REDIS_URL) {
      throw new Error('REDIS_URL environment variable is not defined');
    }

    this.queue = new Queue<Reminder>('reminder-queue', REDIS_URL);
    this.queue.process(this.processCallback);
  }

  private async processCallback(job: Job) {
    return Promise.reject('TODO: implement');
  }
}

export const queueService = new QueueService();
