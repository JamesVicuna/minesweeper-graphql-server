import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];
// const typeDefs = gql`
//   type Book {
//     title: String
//     author: String
//   }
//   type Query {
//     books: [Book]
//   }
// `;
// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };
const typeDefs = gql `
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
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
