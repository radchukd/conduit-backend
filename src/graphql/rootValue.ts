import { articleResolvers } from './article';
import { commentResolvers } from './comment';
import { userResolvers } from './user';

const rootValue = {
  ...articleResolvers,
  ...commentResolvers,
  ...userResolvers,
};

export default rootValue;
