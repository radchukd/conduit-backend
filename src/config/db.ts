import { MongoClient, Db, Collection } from 'mongodb';
import { DB_URI, DB_NAME } from './secrets';

class Database {
  client: MongoClient;

  database: Db;

  articles: Collection;

  comments: Collection;

  users: Collection;

  public readonly init = async function init(): Promise<void> {
    this.client = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.database = await this.client.db(DB_NAME);
    this.articles = await this.database.collection('articles');
    this.comments = await this.database.collection('comments');
    this.users = await this.database.collection('users');
  }
};

const db = new Database();
export default db;
