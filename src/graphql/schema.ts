import { GraphQLSchema, buildSchema } from 'graphql';

const schema: GraphQLSchema = buildSchema(`
  type Query {
    hello(name: String!): String!
  }
`);

export default schema;
