import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

const userTypeDefs: DocumentNode = gql`
  type UserType {
    _id: ID!
    email: String!
    username: String!
    token: String!
    bio: String
    image: String
    createdAt: String!
    updatedAt: String!
  }

  type ProfileType {
    username: String!
    bio: String!
    image: String
    following: Boolean
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    email: String
    username: String
    password: String
    bio: String
    image: String
  }
`;

export default userTypeDefs;
