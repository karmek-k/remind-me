import { Reminder } from '../../models/Reminder';
import { ChannelTransport } from './channelTransport';

class DiscordChannel implements ChannelTransport {
  send(reminder: Reminder): Promise<boolean> {
    // TODO: implement
    return new Promise(resolve => resolve(false));
  }
}

export const discordChannel = new DiscordChannel();
