import { ReminderCreateDto } from '../models/dtos/ReminderCreateDto';
import { Reminder, Channel } from '../models/Reminder';

class ReminderService {
  private reminders: Reminder[];

  constructor() {
    this.reminders = [
      {
        id: 1,
        title: 'clean your room',
        message: "it's really messy",
        channels: new Set<Channel>([Channel.DISCORD]),
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
    const data = {
      ...reminderData,
      id: this.reminders.length + 1,
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
