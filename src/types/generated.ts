import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
   __typename?: 'Query';
  login: UserType;
  user: UserType;
  profile: ProfileType;
  articles: Array<Maybe<ArticleType>>;
  feed: Array<Maybe<ArticleType>>;
  article: ArticleType;
  comments: Array<Maybe<CommentType>>;
  tags: Array<Maybe<Tag>>;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryProfileArgs = {
  username: Scalars['String'];
};


export type QueryArticlesArgs = {
  input: ArticlesInput;
};


export type QueryFeedArgs = {
  input?: Maybe<FeedInput>;
};


export type QueryArticleArgs = {
  slug: Scalars['String'];
};


export type QueryCommentsArgs = {
  slug: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  signup: UserType;
  updateUser: UserType;
  followUser: ProfileType;
  unfollowUser: ProfileType;
  createArticle: ArticleType;
  favoriteArticle: ArticleType;
  unfavoriteArticle: ArticleType;
  updateArticle: ArticleType;
  deleteArticle?: Maybe<Scalars['Boolean']>;
  createComment: CommentType;
  deleteComment?: Maybe<Scalars['Boolean']>;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationFollowUserArgs = {
  username: Scalars['String'];
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String'];
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type MutationFavoriteArticleArgs = {
  slug: Scalars['String'];
};


export type MutationUnfavoriteArticleArgs = {
  slug: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  input: UpdateArticleInput;
};


export type MutationDeleteArticleArgs = {
  slug: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationDeleteCommentArgs = {
  _id: Scalars['ID'];
};

export enum Tag {
  Programming = 'programming',
  Cooking = 'cooking',
  Science = 'science',
  Business = 'business',
  Design = 'design',
  Politics = 'politics'
}

export type ArticleType = {
   __typename?: 'ArticleType';
  _id: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  tagList?: Maybe<Array<Maybe<Tag>>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  favorited: Scalars['Boolean'];
  favoritesCount: Scalars['Int'];
  author: ProfileType;
};

export type ArticlesInput = {
  tag?: Maybe<Tag>;
  author?: Maybe<Scalars['String']>;
  favorited?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type FeedInput = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type CreateArticleInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  body: Scalars['String'];
  tagList?: Maybe<Array<Maybe<Tag>>>;
};

export type UpdateArticleInput = {
  slug: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type CommentType = {
   __typename?: 'CommentType';
  _id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  author: ProfileType;
};

export type CreateCommentInput = {
  slug: Scalars['String'];
  body: Scalars['String'];
};

export type UserType = {
   __typename?: 'UserType';
  _id: Scalars['ID'];
  email: Scalars['String'];
  username: Scalars['String'];
  token: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProfileType = {
   __typename?: 'ProfileType';
  username: Scalars['String'];
  bio: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  following?: Maybe<Scalars['Boolean']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateUserInput = {
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Query: ResolverTypeWrapper<{}>,
  Mutation: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Tag: Tag,
  ArticleType: ResolverTypeWrapper<ArticleType>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  ArticlesInput: ArticlesInput,
  FeedInput: FeedInput,
  CreateArticleInput: CreateArticleInput,
  UpdateArticleInput: UpdateArticleInput,
  CommentType: ResolverTypeWrapper<CommentType>,
  CreateCommentInput: CreateCommentInput,
  UserType: ResolverTypeWrapper<UserType>,
  ProfileType: ResolverTypeWrapper<ProfileType>,
  LoginInput: LoginInput,
  SignupInput: SignupInput,
  UpdateUserInput: UpdateUserInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Query: {},
  Mutation: {},
  ID: Scalars['ID'],
  Tag: Tag,
  ArticleType: ArticleType,
  Int: Scalars['Int'],
  ArticlesInput: ArticlesInput,
  FeedInput: FeedInput,
  CreateArticleInput: CreateArticleInput,
  UpdateArticleInput: UpdateArticleInput,
  CommentType: CommentType,
  CreateCommentInput: CreateCommentInput,
  UserType: UserType,
  ProfileType: ProfileType,
  LoginInput: LoginInput,
  SignupInput: SignupInput,
  UpdateUserInput: UpdateUserInput,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  login?: Resolver<ResolversTypes['UserType'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'input'>>,
  user?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>,
  profile?: Resolver<ResolversTypes['ProfileType'], ParentType, ContextType, RequireFields<QueryProfileArgs, 'username'>>,
  articles?: Resolver<Array<Maybe<ResolversTypes['ArticleType']>>, ParentType, ContextType, RequireFields<QueryArticlesArgs, 'input'>>,
  feed?: Resolver<Array<Maybe<ResolversTypes['ArticleType']>>, ParentType, ContextType, RequireFields<QueryFeedArgs, never>>,
  article?: Resolver<ResolversTypes['ArticleType'], ParentType, ContextType, RequireFields<QueryArticleArgs, 'slug'>>,
  comments?: Resolver<Array<Maybe<ResolversTypes['CommentType']>>, ParentType, ContextType, RequireFields<QueryCommentsArgs, 'slug'>>,
  tags?: Resolver<Array<Maybe<ResolversTypes['Tag']>>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signup?: Resolver<ResolversTypes['UserType'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>,
  updateUser?: Resolver<ResolversTypes['UserType'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>,
  followUser?: Resolver<ResolversTypes['ProfileType'], ParentType, ContextType, RequireFields<MutationFollowUserArgs, 'username'>>,
  unfollowUser?: Resolver<ResolversTypes['ProfileType'], ParentType, ContextType, RequireFields<MutationUnfollowUserArgs, 'username'>>,
  createArticle?: Resolver<ResolversTypes['ArticleType'], ParentType, ContextType, RequireFields<MutationCreateArticleArgs, 'input'>>,
  favoriteArticle?: Resolver<ResolversTypes['ArticleType'], ParentType, ContextType, RequireFields<MutationFavoriteArticleArgs, 'slug'>>,
  unfavoriteArticle?: Resolver<ResolversTypes['ArticleType'], ParentType, ContextType, RequireFields<MutationUnfavoriteArticleArgs, 'slug'>>,
  updateArticle?: Resolver<ResolversTypes['ArticleType'], ParentType, ContextType, RequireFields<MutationUpdateArticleArgs, 'input'>>,
  deleteArticle?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteArticleArgs, 'slug'>>,
  createComment?: Resolver<ResolversTypes['CommentType'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'input'>>,
  deleteComment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, '_id'>>,
};

export type ArticleTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleType'] = ResolversParentTypes['ArticleType']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tagList?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  favorited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  favoritesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  author?: Resolver<ResolversTypes['ProfileType'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CommentTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentType'] = ResolversParentTypes['CommentType']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  author?: Resolver<ResolversTypes['ProfileType'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserType'] = ResolversParentTypes['UserType']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ProfileTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileType'] = ResolversParentTypes['ProfileType']> = {
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  following?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  ArticleType?: ArticleTypeResolvers<ContextType>,
  CommentType?: CommentTypeResolvers<ContextType>,
  UserType?: UserTypeResolvers<ContextType>,
  ProfileType?: ProfileTypeResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
