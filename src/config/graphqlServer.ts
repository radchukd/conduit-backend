import { verify } from 'jsonwebtoken';
import expressGraphql from 'express-graphql';
import depthLimit from 'graphql-depth-limit';
import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { schema, rootValue } from '../graphql';
import { JWT_SECRET } from './secrets';
import { TokenType } from '../types';

export const contextMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const token: string = req.headers && req.headers.authorization;
  try {
    const payload: TokenType = verify(token, JWT_SECRET) as TokenType;
    if (payload.exp < Math.round(Date.now() / 1000)) {
      throw new Error('Token has expired.');
    }
    req.body.context = { token, payload };
    next();
  } catch (e) {
    req.body.context = { token: null, payload: null };
    next();
  }
};

export const graphqlServer = expressGraphql((req: Request) => ({
  schema,
  rootValue,
  validationRules: [depthLimit(7)],
  context: req.body.context,
}));
