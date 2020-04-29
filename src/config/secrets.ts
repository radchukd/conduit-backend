import dotenv from 'dotenv';

dotenv.config();

export const {
  NODE_ENV,
  PORT,
  DB_URI,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRY,
} = process.env;
