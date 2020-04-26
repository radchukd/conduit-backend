import expressGraphql from 'express-graphql';
import depthLimit from 'graphql-depth-limit';
import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { schema, rootValue } from '../graphql';

export const contextMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  req.body.context = { name: 'world' };
  next();
};

export const graphqlServer = expressGraphql((req: Request) => ({
  schema,
  rootValue,
  validationRules: [depthLimit(7)],
  context: req.body.context,
}));
