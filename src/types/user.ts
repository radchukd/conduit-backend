import { ObjectID } from 'mongodb';

export type NewUserDocument = {
  email: string;
  username: string;
  password: string;
  bio: string;
  image: string;
  followers: string[];
  following: string[];
  favorited: string[];
  createdAt: number;
  updatedAt: number;
};

export type UserDocument = NewUserDocument & {
  _id: ObjectID;
};
