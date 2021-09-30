import { ChannelTransport } from './channelTransport';
import { discordChannel } from './discord';

export enum ChannelType {
  DISCORD = 'DISCORD'
}

export default new Map<ChannelType, ChannelTransport>([
  [ChannelType.DISCORD, discordChannel]
]);
