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

    for (const job of reminderJobProvider.all()) {
      await this.queue.add(job, { repeat: { cron: job.cron } });
    }

    return await this.queue.count();
  }

  private async processCallback(job: Job<ReminderJob>) {
    const { id } = job.data;

    loggerService.log(`Processing job with id ${id}`, 'verbose');

    if (!job.data.active) {
      loggerService.log(`Job with id ${id} is inactive`, 'verbose');
      return;
    }

    const reminder = reminderProvider.find(job.data.reminderId);
    if (!reminder) {
      loggerService.log(
        `The reminder for job ${id} could not be found!`,
        'error'
      );
      return Promise.reject();
    }

    for (const channel of job.data.channels) {
      const transport = channelMap.get(channel);
      if (!transport) {
        loggerService.log(
          `The transport for channel ${channel} could not be found!`,
          'warning'
        );
        continue;
      }

      loggerService.log(
        `Sending a reminder titled '${reminder.title}' by channel ${channel}`,
        'verbose'
      );
      await transport.send(reminder);
    }

    return Promise.resolve();
  }
}

export const queueService = new QueueService();
