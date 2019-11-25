import { Database } from '@marcj/marshal-mongo'
import { Connection, createConnection } from 'typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'


let mongoMemoryServer: MongoMemoryServer
let connection: Connection
let database: Database

export async function getDatabase(): Promise<Database> {
  if (!mongoMemoryServer){
    mongoMemoryServer = new MongoMemoryServer()
    await mongoMemoryServer.getInstanceInfo()
    console.log("started a db connection")
  }
  if (!database) {
    connection = await createConnection({
      type: 'mongodb',
      host: 'localhost',
      port: await mongoMemoryServer.getPort(),
      database: 'testing',
      useNewUrlParser: true
    })
    database = new Database(connection, 'testing')
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
