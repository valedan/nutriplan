// pages/api/graphql.ts
import { ApolloServer, gql } from "apollo-server-lambda";
import { context } from "../../graphql/context";

const typeDefs = gql`
  type Query {
    greeting: String!
  }
`;

const resolvers = {
  Query: {
    greeting: () => {
      console.log("resolving");
      return "Hello world!";
    },
  },
};

const server = new ApolloServer({ typeDefs, context, resolvers });

const handler = server.createHandler({ expressGetMiddlewareOptions: { path: "/api/graphql" } });

export default handler;
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
