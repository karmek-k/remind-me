import Queue from 'bull';
import { Reminder } from '../models/Reminder';
import channelMap from './channels/channelMap';
import { reminderService } from './reminderService';

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
    this.queue.add(reminder, { repeat: { cron: reminder.cron } });
  }

  async loadJobs() {
    reminderService.all().forEach(rem => {
      this.add(rem);
    });
  }

  private async processCallback(job: Queue.Job<Reminder>) {
    const chanTypes = job.data.channels.values();
    console.log('a');

    // IterableIterator<T> doesn't support forEach method
    for (const chanType of chanTypes) {
      const transport = channelMap.get(chanType);
      if (!transport) {
        throw new Error(`Invalid channel type: ${chanType}`);
      }

      await transport.send(job.data);
    }

    return Promise.resolve();
  }
}

export const scheduleService = new ScheduleService();
