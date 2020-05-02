import { ObjectId } from 'mongodb';
import isLength from 'validator/lib/isLength';
import { db } from '../../config';
import {
  Context,
  CommentType,
  UserDocument,
  ArticleDocument,
  CommentDocument,
  QueryCommentsArgs,
  NewCommentDocument,
  MutationCreateCommentArgs,
  MutationDeleteCommentArgs,
} from '../../types';
import { CD2CT } from '../../util';

const commentResolvers = {
  comments: async (
    args: QueryCommentsArgs,
    context: Context,
  ): Promise<CommentType[]> => {
    const _id = context.payload ? context.payload._id : null;
    const slug = args.slug.trim();
    const comments: CommentDocument[] = await db.comments.find({ slug }).toArray();
    return Promise.all(comments.map(async (comment: CommentDocument) => {
      const author: UserDocument = await db.users.findOne({ _id: comment.authorId });
      return CD2CT(comment, author, _id);
    }));
  },
  createComment: async (
    args: MutationCreateCommentArgs,
    context: Context,
  ): Promise<CommentType> => {
    if (!context.payload) { throw new Error('User is not logged in.'); }
    const { payload: { _id } } = context;
    const { input } = args;
    const slug = input.slug.trim();
    const body = input.body.trim();
    if (!isLength(body, { min: 3, max: 280 })) {
      throw new Error('Body length must be in [3, 280].');
    }
    const article: ArticleDocument = await db.articles.findOne({ slug });
    if (!article) { throw new Error('Article not found.'); }
    const newComment: NewCommentDocument = {
      slug,
      body,
      authorId: new ObjectId(_id),
      createdAt: (new Date()).valueOf(),
      updatedAt: (new Date()).valueOf(),
    };
    const { insertedId } = await db.comments.insertOne(newComment);
    article.comments.push(insertedId);
    await db.articles.findOneAndReplace({ _id: article._id }, article);
    const comment: CommentDocument = await db.comments.findOne({ _id: new ObjectId(insertedId) });
    const author: UserDocument = await db.users.findOne({ _id: comment.authorId });
    return CD2CT(comment, author, _id);
  },
  deleteComment: async (
    args: MutationDeleteCommentArgs,
    context: Context,
  ): Promise<boolean> => {
    if (!context.payload) { throw new Error('User is not logged in.'); }
    const authorId = context.payload._id;
    const _id = args._id.trim();
    const comment: CommentDocument = await db.comments.findOne({ _id: new ObjectId(_id) });
    if (!comment) { throw new Error('Comment not found.'); }
    if (!comment.authorId.equals(authorId)) { throw new Error('User is not author.'); }
    await db.comments.findOneAndDelete({ _id: comment._id });
    return true;
  },
};

export default commentResolvers;
