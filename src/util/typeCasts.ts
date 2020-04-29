import {
  UserType,
  ArticleType,
  CommentType,
  ProfileType,
  UserDocument,
  ArticleDocument,
  CommentDocument,
} from '../types';

export const UD2PT = (user: UserDocument, followerId: string | null): ProfileType => (
  {
    following: !!followerId && user.followers.includes(followerId),
    username: user.username,
    bio: user.bio,
    image: user.image,
  }
);

export const UD2UT = (user: UserDocument, token: string): UserType => (
  {
    _id: user._id.toHexString(),
    email: user.email,
    username: user.username,
    bio: user.bio,
    image: user.image,
    createdAt: (new Date(user.createdAt)).toString(),
    updatedAt: (new Date(user.updatedAt)).toString(),
    token,
  }
);

export const AD2AT = (
  article: ArticleDocument,
  author: UserDocument,
  userId: string | null,
): ArticleType => (
  {
    _id: article._id.toHexString(),
    slug: article.slug,
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: article.tagList,
    createdAt: (new Date(article.createdAt)).toString(),
    updatedAt: (new Date(article.updatedAt)).toString(),
    favorited: !!userId && article.favorited.includes(userId),
    favoritesCount: article.favoritesCount,
    author: UD2PT(author, userId),
  }
);

export const CD2CT = (
  comment: CommentDocument,
  author: UserDocument,
  userId: string,
): CommentType => (
  {
    _id: comment._id.toHexString(),
    body: comment.body,
    createdAt: (new Date(comment.createdAt)).toString(),
    updatedAt: (new Date(comment.updatedAt)).toString(),
    author: UD2PT(author, userId),
  }
);
