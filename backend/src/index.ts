import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import ReminderResolver from './resolvers/ReminderResolver';
import { loggerService } from './services/logger';
import { queueService } from './services/queue';
import ReminderJobResolver from './resolvers/ReminderJobResolver';
import { createConnection } from 'typeorm';
import { dbConfig } from './config/db';
import UserResolver from './resolvers/UserResolver';
import { jwtAuthChecker, jwtAuthContext } from './config/auth';

async function init() {
  await createConnection(dbConfig);
  loggerService.log('Database connection established');

  const jobCount = await queueService.loadJobs();
  loggerService.log(`Job count: ${jobCount}`);

  const schema = await buildSchema({
    resolvers: [ReminderResolver, ReminderJobResolver, UserResolver],
    authChecker: jwtAuthChecker
  });
  const server = new ApolloServer({
    schema,
    context: jwtAuthContext
  });

  const port = process.env.PORT ?? 8000;
  const { url } = await server.listen(port);
  loggerService.log(`Server running on ${url}`);
}

init();
