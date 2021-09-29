const {MongoClient} = require('mongodb');

let db;

const connect = async (url, dbName = 'zeta') => {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
};

const get = () => db;

<<<<<<< HEAD
module.exports = { connect, get };
=======
export default { connect, get };
>>>>>>> 60a62b1 (fix : MongoDB , google drive)
