import { Reminder } from '../../models/Reminder';
import { ChannelTransport } from './channelTransport';

class ConsoleChannel implements ChannelTransport {
  send(reminder: Reminder): Promise<boolean> {
    const message = `

New message!
Title: ${reminder.title}
Message: ${reminder.message}

`;
    console.log(message);

    return new Promise(resolve => resolve(true));
  }
}

export const consoleChannel = new ConsoleChannel();
