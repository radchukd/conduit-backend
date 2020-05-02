import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

const commentTypeDefs: DocumentNode = gql`
  type CommentType {
    _id: ID!
    body: String!
    createdAt: String!
    updatedAt: String!
    author: ProfileType!
  }

  input CreateCommentInput {
    slug: String!
    body: String!
  }
`;

export default commentTypeDefs;
