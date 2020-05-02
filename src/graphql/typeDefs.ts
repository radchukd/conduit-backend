import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { articleTypeDefs } from './article';
import { commentTypeDefs } from './comment';
import { userTypeDefs } from './user';

const queryTypeDefs: DocumentNode = gql`
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
`;

const mutationTypeDefs: DocumentNode = gql`
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
`;

const typeDefs: DocumentNode[] = [
  queryTypeDefs,
  mutationTypeDefs,
  articleTypeDefs,
  commentTypeDefs,
  userTypeDefs,
];

export default typeDefs;
