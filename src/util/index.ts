import { randomBytes } from 'crypto';

export * from './typeCasts';

export const createSlug = (title: string): string => (
  `${title.toLowerCase().split(' ').join('-')}-${randomBytes(10).toString('hex')}`
);
