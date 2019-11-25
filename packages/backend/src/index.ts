import express from 'express'
import 'reflect-metadata'
import { IUser } from '@fuse-starter-typescript/shared/interfaces/IUser'
import { User } from '@fuse-starter-typescript/shared/models/User'
import { getDatabase, shutdownMongo } from './mongo'
import { Database } from '@marcj/marshal-mongo'

export const app = express()

app.use(express.json())

let db: Database

app.get('/api/users', async function (req, res) {
  // ensure we have a DB connection, and seed the database
  // todo: move seeding to another place, but for now
  db = await getDatabase()
  const user: IUser = new User('Mike', 'Gajda')
  await db.add(User, user)

  // now get all the users
  let users: User[] = await db.find(User)
  res.send(users)
})

app.listen(3000, async function () {
  console.log('Listening on port 3000')
})

process.on('exit', async function () {
  console.log('index.ts received exit event')
  await shutdownMongo()
})

