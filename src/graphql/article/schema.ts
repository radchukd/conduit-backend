const articleSchema = `
  enum Tag {
    programming
    cooking
    science
    business
    design
    politics
  }

  type ArticleType {
    _id: ID!
    slug: String!
    title: String!
    description: String!
    body: String!
    tagList: [Tag]
    createdAt: String!
    updatedAt: String!
    favorited: Boolean!
    favoritesCount: Int!
    author: ProfileType!
  }

  input ArticlesInput {
    tag: Tag
    author: String
    favorited: String
    limit: Int
    offset: Int
  }

  input FeedInput {
    limit: Int
    offset: Int
  }

  input CreateArticleInput {
    title: String!
    description: String!
    body: String!
    tagList: [Tag]
  }

  input UpdateArticleInput {
    slug: String!
    title: String
    description: String
    body: String
  }
  
`;

export default articleSchema;
