import { ConnectionOptions } from 'typeorm';
import { Reminder } from '../models/Reminder';
import { ReminderJob } from '../models/ReminderJob';
import { User } from '../models/User';
import { WebhookConfig } from '../models/WebhookConfig';

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Reminder, ReminderJob, WebhookConfig],
  synchronize: true
};
