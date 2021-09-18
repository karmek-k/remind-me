import { ReminderCreateDto } from '../models/dtos/ReminderCreateDto';
import { Reminder } from '../models/Reminder';
import { ChannelType } from './channels/channelMap';

class ReminderService {
  private reminders: Reminder[];

  constructor() {
    this.reminders = [
      {
        id: 1,
        title: 'clean your room',
        message: "it's really messy",
        channels: new Set<ChannelType>([ChannelType.CONSOLE]),
        hour: 0,
        minute: 0,
        cron: '* * * * *',
        active: true
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
    const { hour, minute } = reminderData;

    const data: Reminder = {
      ...reminderData,
      id: this.reminders.length + 1,
      cron: `${minute} ${hour} * * *`,
      active: false
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

export const reminderService = new ReminderService();
