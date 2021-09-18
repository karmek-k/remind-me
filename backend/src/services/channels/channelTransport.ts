import { Reminder } from '../../models/Reminder';

export enum ChannelType {
  CONSOLE = 'CONSOLE',
  DISCORD = 'DISCORD'
}

export interface ChannelTransport {
  send(reminder: Reminder): Promise<boolean>;
}
