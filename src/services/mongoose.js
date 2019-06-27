import mongoose from 'mongoose';
import log from './winston';

export default async () => {
  try {
    const {
      MONGO_INITDB_DBNAME,
      MONGO_INITDB_HOST,
      MONGO_INITDB_ROOT_USERNAME,
      MONGO_INITDB_ROOT_PASSWORD,
    } = process.env;
    await mongoose.connect(`mongodb://${MONGO_INITDB_HOST}:27017`, {
      dbName: MONGO_INITDB_DBNAME,
      user: MONGO_INITDB_ROOT_USERNAME,
      pass: MONGO_INITDB_ROOT_PASSWORD,
      auth: { authdb: 'admin' },
    });
  } catch (error) {
    log.error(error);
    throw error;
  }
};
