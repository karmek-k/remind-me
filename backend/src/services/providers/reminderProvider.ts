import { ReminderCreateDto } from '../../models/dtos/ReminderCreateDto';
import { Reminder } from '../../models/Reminder';
import { ChannelType } from '../channels/channelMap';

class ReminderProvider {
  private reminders: Reminder[];

  constructor() {
    this.reminders = [
      {
        id: 1,
        title: 'clean your room',
        message: "it's really messy",
        jobs: [
          {
            id: 1,
            channels: [ChannelType.CONSOLE],
            hour: 0,
            minute: 0,
            cron: '* * * * *',
            active: true
          }
        ]
      }
    ];
  }

  all() {
    return this.reminders;
  }

  find(id: number) {
    return this.reminders.find(r => r.id === id);
  }

  insert(reminderData: ReminderCreateDto) {
    const data: Reminder = {
      ...reminderData,
      id: this.reminders.length + 1,
      jobs: []
    };

    this.reminders.push(data);

    return data;
  }

  delete(id: number) {
    const toDelete = this.reminders.find(rem => rem.id === id);

    this.reminders = this.reminders.filter(rem => rem !== toDelete);

    return toDelete;
  }
}

export const reminderProvider = new ReminderProvider();
