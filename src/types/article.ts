import { ObjectID } from 'mongodb';
import { Tag } from './generated';

export type NewArticleDocument = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList?: Tag[];
  createdAt: number;
  updatedAt: number;
  favorited: string[];
  favoritesCount: number;
  comments: string[];
  authorId: ObjectID;
};

export type ArticleDocument = NewArticleDocument & {
  _id: ObjectID;
};
