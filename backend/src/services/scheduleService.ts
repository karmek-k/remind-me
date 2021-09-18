import Queue from 'bull';
import { Reminder } from '../models/Reminder';
import channelMap, { ChannelType } from './channels/channelMap';
import { reminderService } from './reminderService';
import { loggerService } from './loggerService';

class ScheduleService {
  private queue: Queue.Queue<Reminder>;

  constructor() {
    const { REDIS_URL } = process.env;

    if (!REDIS_URL) {
      throw new Error('REDIS_URL environment variable is not defined');
    }

    this.queue = new Queue<Reminder>('reminder-queue', REDIS_URL);
    this.queue.process(this.processCallback);
  }

  add(reminder: Reminder) {
    loggerService.log(`Adding reminder titled '${reminder.title}'`, 'verbose');

    this.queue.add(reminder, { repeat: { cron: reminder.cron } });
  }

  async loadJobs() {
    loggerService.log('Emptying the queue and loading jobs');

    await this.queue.empty();

    reminderService.all().forEach(rem => {
      this.add(rem);
    });
  }

  private async processCallback(job: Queue.Job<Reminder>) {
    loggerService.log(
      `Executing job for reminder '${job.data.title}'`,
      'verbose'
    );

    for (const chanType of job.data.channels) {
      const transport = channelMap.get(chanType);
      if (!transport) {
        throw new Error(`Invalid channel type: ${chanType}`);
      }

      loggerService.log(
        `Sending reminder '${job.data.title}': channel ${chanType}`,
        'verbose'
      );

      await transport.send(job.data);
    }

    return Promise.resolve();
  }
}

export const scheduleService = new ScheduleService();
