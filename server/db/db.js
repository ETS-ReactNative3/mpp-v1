const {MongoClient} = require('mongodb');

let db;

const connect = async (url, dbName = 'MPP') => {
  const client = new MongoClient(url, { useUnifiedTopology: true ,useNewUrlParser: true });
  await client.connect();
  db = client.db(dbName);
};

const get = () => db;

export default { connect, get };
