import { ObjectID } from 'mongodb';

export type NewCommentDocument = {
  slug: string;
  body: string;
  authorId: ObjectID;
  createdAt: number;
  updatedAt: number;
};

export type CommentDocument = NewCommentDocument & {
  _id: ObjectID;
};
