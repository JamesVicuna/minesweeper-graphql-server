import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const typeDefs = gql`
  type Game {
    id: ID!
    user: String!
    rows: Int!
    columns: Int!
    bombs: Int!
    time: Int!
    createdAt: String!
  }

  type Query {
    leaderboard: [Game]
  }
`;

const resolvers = {
  Query: {
    leaderboard: async () => await prisma.leaderboard.findMany()
  },
};

const server = new ApolloServer({
  typeDefs,

  resolvers,
});

const { url } = await startStandaloneServer(server, {
    //@ts-ignore
  listen: { port: process.env.PORT || 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
