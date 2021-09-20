import { ReminderCreateDto } from '../../models/dtos/ReminderCreateDto';
import { Reminder } from '../../models/Reminder';

class ReminderProvider {
  async all() {
    return await Reminder.find();
  }

  async find(id: number) {
    return await Reminder.findOne(id);
  }

  async insert(reminderData: ReminderCreateDto) {
    const newReminder = new Reminder();

    newReminder.title = reminderData.title;
    newReminder.message = reminderData.message;
    newReminder.jobs = [];

    return await newReminder.save();
  }

  async delete(id: number) {
    const reminder = await this.find(id);
    if (!reminder) {
      throw new Error(`Reminder with id ${id} is not defined`);
    }

    return await reminder.remove();
  }
}

export const reminderProvider = new ReminderProvider();
