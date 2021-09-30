import Queue, { Job } from 'bull';
import { ReminderJob } from '../models/ReminderJob';
import channelMap from './channels/channelMap';
import { loggerService } from './logger';
import { reminderProvider } from './providers/reminder';
import { reminderJobProvider } from './providers/reminderJob';

class QueueService {
  private queue: Queue.Queue<ReminderJob>;

  constructor() {
    const { REDIS_URL } = process.env;

    if (!REDIS_URL) {
      throw new Error('REDIS_URL environment variable is not defined');
    }

    this.queue = new Queue<ReminderJob>('reminder-queue', REDIS_URL);
    this.queue.process(this.processCallback);
  }

  async loadJobs() {
    loggerService.log('Loading all jobs to the queue');

    for (const job of await reminderJobProvider.all()) {
      await this.addJob(job);
    }

    return await this.queue.count();
  }

  async addJob(job: ReminderJob) {
    await this.queue.add(job, {
      jobId: job.id,
      repeat: { cron: job.cron }
    });
  }

  async deleteJob(job: ReminderJob) {
    await this.queue.removeRepeatable({ jobId: job.id, cron: job.cron });
  }

  private async processCallback(job: Job<ReminderJob>) {
    const { id } = job.data;

    loggerService.log(`Processing job with id ${id}`, 'verbose');

    return await reminderJobProvider.trigger(id);
  }
}

export const queueService = new QueueService();
