import { ObjectId } from 'mongodb';
import isLength from 'validator/lib/isLength';
import { db } from '../../config';
import {
  Tag,
  Context,
  ArticleType,
  UserDocument,
  QueryFeedArgs,
  ArticleDocument,
  QueryArticleArgs,
  QueryArticlesArgs,
  NewArticleDocument,
  ResolversParentTypes,
  MutationCreateArticleArgs,
  MutationUpdateArticleArgs,
  MutationDeleteArticleArgs,
  MutationFavoriteArticleArgs,
  MutationUnfavoriteArticleArgs,
} from '../../types';
import { AD2AT, createSlug } from '../../util';

const articleResolvers = {
  Query: {
    articles: async (
      _parent: ResolversParentTypes,
      args: QueryArticlesArgs,
      context: Context,
    ): Promise<ArticleType[]> => {
      const _id = context.payload ? context.payload._id : null;
      const limit = (args.input && args.input.limit) || 20;
      const offset = (args.input && args.input.offset) || 0;
      const tag = args.input && args.input.tag;
      const author = args.input && args.input.author;
      const favorited = args.input && args.input.favorited;
      const query: { tagList?: Tag; authorId?: ObjectId; _id?: object } = {};
      let authorDoc: UserDocument = null;
      if (tag) { query.tagList = tag; }
      if (author) {
        authorDoc = await db.users.findOne({ username: author });
        if (!authorDoc) { throw new Error('Author not found.'); }
        query.authorId = authorDoc._id;
      }
      if (favorited) {
        const favoritedDoc: UserDocument = await db.users.findOne({ username: favorited });
        if (!favorited) { throw new Error('User not found.'); }
        query._id = { $in: favoritedDoc.favorited };
      }
      const articles: ArticleDocument[] = await db.articles.find(query)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .toArray();
      return Promise.all(articles.map(async (article: ArticleDocument) => {
        if (authorDoc) { return AD2AT(article, authorDoc, _id); }
        const articleAuthor: UserDocument = await db.users.findOne({ _id: article.authorId });
        return AD2AT(article, articleAuthor, _id);
      }));
    },
    feed: async (
      _parent: ResolversParentTypes,
      args: QueryFeedArgs,
      context: Context,
    ): Promise<ArticleType[]> => {
      if (!context.payload) { throw new Error('User is not logged in.'); }
      const { payload: { _id } } = context;
      const limit = (args.input && args.input.limit) || 20;
      const offset = (args.input && args.input.offset) || 0;
      const user: UserDocument = await db.users.findOne({ _id: new ObjectId(_id) });
      if (!user) { throw new Error('User not found.'); }
      const query = { authorId: { $in: user.following.map((id) => new ObjectId(id)) } };
      const articles: ArticleDocument[] = await db.articles.find(query)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .toArray();
      return Promise.all(articles.map(async (article: ArticleDocument) => {
        const author: UserDocument = await db.users.findOne({ _id: article.authorId });
        return AD2AT(article, author, _id);
      }));
    },
    article: async (
      _parent: ResolversParentTypes,
      args: QueryArticleArgs,
      context: Context,
    ): Promise<ArticleType> => {
      const _id = context.payload ? context.payload._id : null;
      const slug = args.slug.trim();
      const article: ArticleDocument = await db.articles.findOne({ slug });
      if (!article) { throw new Error('Article not found.'); }
      const author: UserDocument = await db.users.findOne({ _id: article.authorId });
      return AD2AT(article, author, _id);
    },
    tags: async (): Promise<Tag[]> => Object.values(Tag),
  },
  Mutation: {
    createArticle: async (
      _parent: ResolversParentTypes,
      args: MutationCreateArticleArgs,
      context: Context,
    ): Promise<ArticleType> => {
      if (!context.payload) { throw new Error('User is not logged in.'); }
      const { payload: { _id } } = context;
      const { input } = args;
      const { tagList } = input;
      const title = input.title.trim();
      const description = input.description.trim();
      const body = input.body.trim();
      if (!isLength(title, { min: 3, max: 64 })
        || !isLength(description, { min: 3, max: 280 })
        || !isLength(body, { min: 3, max: 65536 })) {
        throw new Error('Invalid input');
      }
      const slug = createSlug(title);
      const newArticle: NewArticleDocument = {
        slug,
        title,
        description,
        body,
        tagList: tagList || [],
        createdAt: (new Date()).valueOf(),
        updatedAt: (new Date()).valueOf(),
        favorited: [],
        favoritesCount: 0,
        comments: [],
        authorId: new ObjectId(_id),
      };
      const { insertedId } = await db.articles.insertOne(newArticle);
      const article: ArticleDocument = await db.articles.findOne({ _id: new ObjectId(insertedId) });
      const author: UserDocument = await db.users.findOne({ _id: article.authorId });
      return AD2AT(article, author, _id);
    },
    favoriteArticle: async (
      _parent: ResolversParentTypes,
      args: MutationFavoriteArticleArgs,
      context: Context,
    ): Promise<ArticleType> => {
      if (!context.payload) { throw new Error('User is not logged in.'); }
      const { payload: { _id } } = context;
      const slug = args.slug.trim();
      const article: ArticleDocument = await db.articles.findOne({ slug });
      if (!article) { throw new Error('Article not found.'); }
      if (article.favorited.includes(_id)) { throw new Error('Article is already favurited.'); }
      article.favorited.push(_id);
      article.favoritesCount += 1;
      await db.articles.findOneAndReplace({ _id: article._id }, article);
      const author: UserDocument = await db.users.findOne({ _id: article.authorId });
      const user: UserDocument = await db.users.findOne({ _id: new ObjectId(_id) });
      user.favorited.push(article._id.toHexString());
      await db.users.findOneAndReplace({ _id: new ObjectId(_id) }, user);
      return AD2AT(article, author, _id);
    },
    unfavoriteArticle: async (
      _parent: ResolversParentTypes,
      args: MutationUnfavoriteArticleArgs,
      context: Context,
    ): Promise<ArticleType> => {
      if (!context.payload) { throw new Error('User is not logged in.'); }
      const { payload: { _id } } = context;
      const slug = args.slug.trim();
      const article: ArticleDocument = await db.articles.findOne({ slug });
      if (!article) { throw new Error('Article not found.'); }
      if (!article.favorited.includes(_id)) { throw new Error('Article is not favorited.'); }
      article.favorited.splice(article.favorited.indexOf(_id, 1), 1);
      article.favoritesCount -= 1;
      await db.articles.findOneAndReplace({ _id: article._id }, article);
      const author: UserDocument = await db.users.findOne({ _id: article.authorId });
      const user: UserDocument = await db.users.findOne({ _id: new ObjectId(_id) });
      user.favorited.splice(user.favorited.indexOf(article._id.toHexString()), 1);
      await db.users.findOneAndReplace({ _id: new ObjectId(_id) }, user);
      return AD2AT(article, author, _id);
    },
    updateArticle: async (
      _parent: ResolversParentTypes,
      args: MutationUpdateArticleArgs,
      context: Context,
    ): Promise<ArticleType> => {
      if (!context.payload) { throw new Error('User is not logged in.'); }
      const { payload: { _id } } = context;
      const { input } = args;
      if (Object.keys(input).length === 0) { throw new Error('No input provided.'); }
      const slug = input.slug.trim();
      const title = input.title && input.title.trim();
      const description = input.description && input.description.trim();
      const body = input.body && input.description.trim();
      const article: ArticleDocument = await db.articles.findOne({ slug });
      if (!article) { throw new Error('Article not found.'); }
      if (!article.authorId.equals(_id)) { throw new Error('User is not author.'); }
      if (title && title !== article.title) {
        if (!isLength(title, { min: 3, max: 64 })) { throw new Error('Invalid title.'); }
        article.title = title;
        article.slug = createSlug(title);
      }
      if (description && description !== article.description) {
        if (!isLength(description, { min: 3, max: 280 })) { throw new Error('Invalid description.'); }
        article.description = description;
      }
      if (body && body !== article.body) {
        if (!isLength(body, { min: 3, max: 65536 })) { throw new Error('Invalid body'); }
        article.body = body;
      }
      article.updatedAt = (new Date()).valueOf();
      await db.articles.findOneAndReplace({ _id: article._id }, article);
      const author: UserDocument = await db.users.findOne({ _id: article.authorId });
      return AD2AT(article, author, _id);
    },
    deleteArticle: async (
      _parent: ResolversParentTypes,
      args: MutationDeleteArticleArgs,
      context: Context,
    ): Promise<boolean> => {
      if (!context.payload) { throw new Error('User is not logged in.'); }
      const { payload: { _id } } = context;
      const slug = args.slug.trim();
      const article: ArticleDocument = await db.articles.findOne({ slug });
      if (!article) { throw new Error('Article not found.'); }
      if (!article.authorId.equals(_id)) { throw new Error('User is not author.'); }
      await db.articles.deleteOne({ _id: article._id });
      return true;
    },
  },
};

export default articleResolvers;
