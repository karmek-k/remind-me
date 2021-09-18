import { Reminder } from '../../models/Reminder';

export interface ChannelTransport {
  send(reminder: Reminder): Promise<void>;
}
