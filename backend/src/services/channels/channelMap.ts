import { ChannelTransport, ChannelType } from './ChannelTransport';
import { discordChannel } from './discord';
import { consoleChannel } from './console';

export default new Map<ChannelType, ChannelTransport>([
  [ChannelType.CONSOLE, consoleChannel],
  [ChannelType.DISCORD, discordChannel]
]);
