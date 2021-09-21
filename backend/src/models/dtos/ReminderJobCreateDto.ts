import { InputType, Field, Int } from 'type-graphql';
import { Min, Max, ArrayUnique } from 'class-validator';
import { ChannelType } from '../../services/channels/channelMap';
import { Dto } from './Dto';

@InputType()
export class ReminderJobCreateDto implements Dto {
  @Field(() => Int)
  @Min(1)
  reminderId!: number;

  @Field(() => [ChannelType])
  @ArrayUnique()
  channels!: ChannelType[];

  @Field(() => Int)
  @Min(0)
  @Max(23)
  hour!: number;

  @Field(() => Int)
  @Min(0)
  @Max(59)
  minute!: number;
}
