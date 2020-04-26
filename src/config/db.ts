import { MongoClient, Db } from 'mongodb';
import { DB_URI, DB_NAME } from './secrets';

class Database {
  client: MongoClient;

  database: Db;

  public readonly init = async function init(): Promise<void> {
    this.client = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.database = await this.client.db(DB_NAME);
  }
};

const db = new Database();
export default db;
