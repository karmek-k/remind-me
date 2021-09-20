import { Field, Int, ObjectType } from 'type-graphql';
import { ReminderJob } from './ReminderJob';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class Reminder extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column()
  message!: string;

  @Field(() => [ReminderJob])
  @OneToMany(() => ReminderJob, job => job.reminder, {
    cascade: true,
    eager: true
  })
  jobs!: ReminderJob[];
}
