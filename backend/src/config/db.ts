import { ConnectionOptions } from 'typeorm';
import { Reminder } from '../models/Reminder';
import { ReminderJob } from '../models/ReminderJob';
import { User } from '../models/User';
import { WebhookConfig } from '../models/WebhookConfig';

const { DATABASE_URL, SYNC_DB } = process.env;

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  url: DATABASE_URL,
  entities: [User, Reminder, ReminderJob, WebhookConfig],
  synchronize: SYNC_DB === '1'
};
