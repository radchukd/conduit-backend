const commentSchema = `
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

export default commentSchema;
