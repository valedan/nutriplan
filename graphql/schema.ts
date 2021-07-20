const { gql } = require("apollo-server");

export const typeDefs = gql`
  type Query {
    greeting: String!
  }
`;
