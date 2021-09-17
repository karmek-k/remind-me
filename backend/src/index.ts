import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    ping: String!
  }
`;

const resolvers = {
  Query: {
    ping: () => 'pong'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`);
});
