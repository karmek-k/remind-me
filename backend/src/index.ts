import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import ReminderResolver from './resolvers/ReminderResolver';
import { loggerService } from './services/logger';
import { queueService } from './services/queue';
import ReminderJobResolver from './resolvers/ReminderJobResolver';

async function init() {
  const jobCount = await queueService.loadJobs();
  loggerService.log(`Job count: ${jobCount}`);

  const schema = await buildSchema({
    resolvers: [ReminderResolver, ReminderJobResolver]
  });
  const server = new ApolloServer({ schema });

  const { url } = await server.listen();
  loggerService.log(`Server running on ${url}`);
}

init();
