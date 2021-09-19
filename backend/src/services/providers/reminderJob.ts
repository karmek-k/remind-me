import { ReminderJob } from '../../models/ReminderJob';
import { ChannelType } from '../channels/channelMap';
import { ReminderJobCreateDto } from '../../models/dtos/ReminderJobCreateDto';

class ReminderJobProvider {
  private reminderJobs: ReminderJob[];

  constructor() {
    this.reminderJobs = [
      {
        id: 1,
        reminderId: 1,
        channels: [ChannelType.CONSOLE],
        hour: 0,
        minute: 0,
        cron: '* * * * *',
        active: true
      }
    ];
  }

  all() {
    return this.reminderJobs;
  }

  find(id: number) {
    return this.reminderJobs.find(rj => rj.id === id);
  }

  findForReminder(reminderId: number) {
    return this.reminderJobs.filter(rj => rj.reminderId === reminderId);
  }

  insert(reminderJobData: ReminderJobCreateDto) {
    const { hour, minute } = reminderJobData;

    const data: ReminderJob = {
      ...reminderJobData,
      id: this.reminderJobs.length + 1,
      cron: `${minute} ${hour} * * *`,
      active: true
    };

    this.reminderJobs.push(data);

    return data;
  }

  delete(id: number) {
    const toDelete = this.reminderJobs.find(rem => rem.id === id);

    this.reminderJobs = this.reminderJobs.filter(rem => rem !== toDelete);

    return toDelete;
  }
}

export const reminderJobProvider = new ReminderJobProvider();
