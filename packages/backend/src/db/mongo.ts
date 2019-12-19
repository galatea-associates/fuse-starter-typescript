import { Database } from '@marcj/marshal-mongo'
import { Connection, createConnection } from 'typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoMemoryServer: MongoMemoryServer
let connection: Connection
let database: Database

export async function getDatabase (): Promise<Database> {

  if (!database) {
    connection = await createConnection({
      type: 'mongodb',
      url: process.env.MONGO_URL
    })
    database = new Database(connection, process.env.MONGO_COLLECTION_NAME)
  }

  return database
}
export async function shutdownMongo () {
  console.log('in mongo.ts shutdown()')
  if (connection) {
    await connection.close()
  }
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop()
  }
}
