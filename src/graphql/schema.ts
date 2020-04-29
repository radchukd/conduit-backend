import { GraphQLSchema, buildSchema } from 'graphql';
import { articleSchema } from './article';
import { commentSchema } from './comment';
import { userSchema } from './user';

const schema: GraphQLSchema = buildSchema(`
  type Query {
    login(input: LoginInput!): UserType!
    user: UserType!
    profile(username: String!): ProfileType!
    articles(input: ArticlesInput): [ArticleType]!
    feed(input: FeedInput): [ArticleType]!
    article(slug: String!): ArticleType!
    comments(slug: String!): [CommentType]!
    tags: [Tag]!
  }

  type Mutation {
    signup(input: SignupInput!): UserType!
    updateUser(input: UpdateUserInput!): UserType!
    followUser(username: String!): ProfileType!
    unfollowUser(username: String!): ProfileType!
    createArticle(input: CreateArticleInput!): ArticleType!
    favoriteArticle(slug: String!): ArticleType!
    unfavoriteArticle(slug: String!): ArticleType!
    updateArticle(input: UpdateArticleInput!): ArticleType!
    deleteArticle(slug: String!): Boolean
    createComment(input: CreateCommentInput!): CommentType!
    deleteComment(_id: ID!): Boolean
  }

  ${articleSchema}
  ${commentSchema}
  ${userSchema}
`);

export default schema;
