import { InputType, Field, Int } from 'type-graphql';
import { ChannelType } from '../../services/channels/channelMap';
import { Dto } from './Dto';

@InputType({ description: 'DTO for adding a new webhook to a reminder.' })
export class WebhookAddDto implements Dto {
  @Field(() => ChannelType, {
    description: 'The channel this webhook is related to.'
  })
  channel!: ChannelType;

  @Field({ description: 'The webhook.' })
  webhook!: string;
}
