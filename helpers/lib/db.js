const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { MONGO_URI } = process.env;

module.exports = {
  /**
   * Connect to MongoDB Database
   *
   * @return {String} Connected Or Err
   */
  async connectDB() {
    let db;
    // DB Config
    if (process.env.NODE_ENV === 'test') {
      mongoServer = new MongoMemoryServer();
      db = await mongoServer.getUri();
    } else {
      db = MONGO_URI;
    }
    return new Promise((resolve, reject) => {
      mongoose
        .connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        })
        .then(() => resolve('MongoDB Connected'))
        .catch((err) => reject(err));
    });
  }
};
