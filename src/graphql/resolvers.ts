import { articleResolvers } from './article';
import { commentResolvers } from './comment';
import { userResolvers } from './user';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Query: {
    ...articleResolvers.Query,
    ...commentResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...articleResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};

export default resolvers;
