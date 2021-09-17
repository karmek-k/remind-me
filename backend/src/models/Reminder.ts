import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class {
  @Field(() => ID)
  id!: number;

  @Field()
  message!: string;
}
