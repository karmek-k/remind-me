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
}

export const reminderService = new ReminderService();
