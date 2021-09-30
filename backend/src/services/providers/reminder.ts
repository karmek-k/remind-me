import { ReminderCreateDto } from '../../models/dtos/ReminderCreateDto';
import { Reminder } from '../../models/Reminder';
import { User } from '../../models/User';
import { loggerService } from '../logger';
import { Provider } from './Provider';

class ReminderProvider implements Provider<Reminder> {
  async all() {
    return await Reminder.find();
  }

  async find(id: number, withWebhooks: boolean = false) {
    return await Reminder.findOne(id, {
      relations: withWebhooks ? ['webhooks'] : undefined
    });
  }

  async insert(reminderData: ReminderCreateDto, user?: User) {
    const newReminder = new Reminder();

    newReminder.title = reminderData.title;
    newReminder.message = reminderData.message;
    newReminder.jobs = [];
    newReminder.user = user!;

    loggerService.log(
      `${user?.username} has added a new reminder #${newReminder.id} titled ${reminderData.title}`
    );

    return await newReminder.save();
  }

  async delete(id: number, user?: User) {
    const reminder = user!.reminders.find(rem => rem.id === id);
    if (!reminder) {
      return Promise.reject(`Reminder with id ${id} is not defined`);
    }

    await reminder.remove();

    return Promise.resolve();
  }
}

export const reminderProvider = new ReminderProvider();
