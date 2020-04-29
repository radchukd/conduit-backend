export * from './generated';
export * from './article';
export * from './comment';
export * from './user';

export type TokenType = {
  _id: string;
  iat: number;
  exp: number;
};

export type Context = {
  token: string;
  payload: TokenType | null;
};
