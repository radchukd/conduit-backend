import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import {
  db,
  PORT,
  NODE_ENV,
  wwwRedirect,
  apolloServer,
  httpsRedirect,
} from './config';

const app = express();
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (NODE_ENV === 'production') {
  app.use('/*', httpsRedirect());
  app.get('/*', wwwRedirect());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
}

apolloServer.applyMiddleware({ app, path: '/graphql' });
app.listen(PORT, async () => { await db.init(); });

export default app;
