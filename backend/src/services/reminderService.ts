import Reminder from '../models/Reminder';

class ReminderService {
  private reminders: Reminder[];

  constructor() {
    this.reminders = [
      {
        id: 1,
        message: 'clean your room'
      }
    ];
  }

  allReminders() {
    return this.reminders;
  }

  oneReminder(id: number) {
    return this.reminders.find(r => r.id === id);
  }
}

export const reminderService = new ReminderService();
