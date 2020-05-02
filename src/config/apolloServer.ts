import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import schema from '../graphql';
import { NODE_ENV, JWT_SECRET } from './secrets';
import { Context, TokenType } from '../types';

const context = async ({ req }: { req: Request }): Promise<Context> => {
  const token: string = req.headers && req.headers.authorization;
  try {
    const payload: TokenType = verify(token, JWT_SECRET) as TokenType;
    if (payload.exp < Math.round(Date.now() / 1000)) {
      throw new Error('Token has expired.');
    }
    return { token, payload };
  } catch (e) {
    return { token: null, payload: null };
  }
};

const apolloServer: ApolloServer = new ApolloServer({
  introspection: NODE_ENV === 'development',
  validationRules: [depthLimit(7)],
  schema,
  context,
});

export default apolloServer;
