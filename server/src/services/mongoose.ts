import mongoose, { ConnectionOptions } from 'mongoose'
import log from './winston'

async function connectChatDB(times: number) {
  setTimeout(async () => {
    try {
      const {
        MONGO_INITDB_DBNAME,
        MONGO_INITDB_HOST,
        MONGO_INITDB_ROOT_USERNAME,
        MONGO_INITDB_ROOT_PASSWORD,
      } = process.env;
      await mongoose.connect(`mongodb://${MONGO_INITDB_HOST}:27017`, {
        dbName: MONGO_INITDB_DBNAME,
        pass: MONGO_INITDB_ROOT_PASSWORD,
        user: MONGO_INITDB_ROOT_USERNAME,
      });
    } catch (error) {
      if (times) {
        connectChatDB(times - 1)
      } else {
        log.error(error)
        throw error
      }
    }
  }, 5000)
}

connectChatDB(12)

export default mongoose
