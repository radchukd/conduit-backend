import dotenv from 'dotenv';

dotenv.config();

export const {
  NODE_ENV,
  PORT,
  DB_URI,
  DB_NAME,
} = process.env;
