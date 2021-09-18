import { Reminder } from '../../models/Reminder';
import { ChannelTransport } from './channelTransport';

class ConsoleChannel implements ChannelTransport {
  send(reminder: Reminder): Promise<void> {
    const message = `

New message!
Title: ${reminder.title}
Message: ${reminder.message}

`;
    console.log(message);

    return Promise.resolve();
  }
}

export const consoleChannel = new ConsoleChannel();
