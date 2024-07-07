import mongodb from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'entrio';
let _db;

const initDb = callback => {
  if (_db) {
    console.log('db is already initialized.');
    return callback(null, _db);
  }
  
  mongodb.MongoClient.connect(url)
    .then(client => {
      _db = client;
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('db not initialized.');
  }
  return _db.db(dbName);
};

export {
  initDb,
  getDb
};