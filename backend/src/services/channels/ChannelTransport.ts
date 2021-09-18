import { Reminder } from '../../models/Reminder';

export enum ChannelType {
  DISCORD = 'DISCORD'
}

export interface ChannelTransport {
  send(reminder: Reminder): Promise<boolean>;
}
