import { InputType, Field, Int } from 'type-graphql';
import { Min, Max, ArrayUnique } from 'class-validator';
import { ChannelType } from '../../services/channels/channelMap';
import { Dto } from './Dto';

@InputType({ description: 'DTO for adding a reminder job.' })
export class ReminderJobCreateDto implements Dto {
  @Field(() => Int, { description: 'The ID of the related reminder.' })
  @Min(1)
  reminderId!: number;

  @Field(() => [ChannelType], {
    description: "Communication channels. This array's items should be unique."
  })
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
