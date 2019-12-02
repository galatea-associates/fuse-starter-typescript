import { Database } from '@marcj/marshal-mongo'
import { Connection, createConnection } from 'typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'
import config from 'config'

let mongoMemoryServer: MongoMemoryServer
let connection: Connection
let database: Database

let mongoUrl:string = config.get("MONGO_URL")

export async function getDatabase(): Promise<Database> {
  // if (!mongoMemoryServer){
  //   mongoMemoryServer = new MongoMemoryServer()
  //   await mongoMemoryServer.getInstanceInfo()
  //   console.log("started a db connection")
  // }
  if (!database) {
    connection = await createConnection({
      type: 'mongodb',
      url: mongoUrl
    })
    database = new Database(connection, config.get("MONGO_COLLECTION_NAME"))
  }

  return database
}
export async function shutdownMongo(){
  console.log("in mongo.ts shutdown()")
  if (connection){
    await connection.close()
  }
  if (mongoMemoryServer){
    await mongoMemoryServer.stop()
  }
}
