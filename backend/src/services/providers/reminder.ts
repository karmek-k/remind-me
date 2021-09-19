import { ReminderCreateDto } from '../../models/dtos/ReminderCreateDto';
import { Reminder } from '../../models/Reminder';
import { reminderJobProvider } from './reminderJob';

class ReminderProvider {
  private reminders: Reminder[];

  constructor() {
    this.reminders = [
      {
        id: 1,
        title: 'clean your room',
        message: "it's really messy",
        jobs: reminderJobProvider.findForReminder(1)
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
