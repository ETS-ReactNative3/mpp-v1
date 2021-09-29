const {MongoClient} = require('mongodb');

let db;

const connect = async (url, dbName = 'zeta') => {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
};

const get = () => db;

export default { connect, get };
